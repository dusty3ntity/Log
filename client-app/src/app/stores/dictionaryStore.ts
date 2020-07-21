import { observable, action, runInAction, computed, reaction } from "mobx";
import { history } from "../..";

import { RootStore } from "./rootStore";
import { IDictionary, INewDictionary, IEditDictionary, IExtendedDictionary } from "./../models/dictionary";
import agent from "../api/agent";
import { ErrorType, NotificationType } from "../models/error";
import { createNotification } from "../common/util/notifications";
import { getLanguageByISOCode } from "./../models/languages";

export default class DictionaryStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		reaction(
			() => this.activeExtendedDictionary,
			async () => {
				if (history.location.pathname.includes("/learning")) {
					await rootStore.learningStore.onInitialLoad();
				} else if (history.location.pathname.includes("/edit-item")) {
					history.push("/items-list");
				}
			}
		);
	}

	@observable loadingInitial = true;
	@observable submitting = false;
	@observable deleting = false;
	@observable settingMain = false;

	@observable loadingTarget: string | undefined;

	@observable extendedDictionariesRegistry = new Map<string, IExtendedDictionary>();
	@observable activeExtendedDictionary: IExtendedDictionary | undefined;

	@computed get activeDictionary(): IDictionary {
		return this.activeExtendedDictionary!.dictionary;
	}

	@computed get dictionariesRegistry(): Map<string, IDictionary> {
		const registry = new Map();

		this.extendedDictionariesRegistry.forEach((extendedDictionary) => {
			registry.set(extendedDictionary.dictionary.id, extendedDictionary.dictionary);
		});

		return registry;
	}

	@computed get totalItemsCount() {
		return this.activeDictionary.wordsCount + this.activeDictionary.phrasesCount;
	}

	@computed get activeDictionaryId() {
		return this.activeDictionary.id;
	}

	@action reset = () => {
		this.extendedDictionariesRegistry = new Map();
		this.activeExtendedDictionary = undefined;
	};

	@action loadDictionaries = async () => {
		this.loadingInitial = true;
		try {
			const dictionaries = await agent.Dictionaries.list();

			runInAction("loading dictionaries", () => {
				if (dictionaries.length === 0) {
					this.rootStore.commonStore.setNewUser(true);
					return;
				}

				this.extendedDictionariesRegistry = new Map();

				dictionaries.forEach((dictionary) => {
					const extendedDictionary: IExtendedDictionary = {
						dictionary: dictionary,
						itemsRegistry: undefined,
						queryParams: { page: 0, predicate: new Map(), queryResultSize: 0 },
					};

					this.extendedDictionariesRegistry.set(dictionary.id, extendedDictionary);
				});

				const mainExtendedDictionary = Array.from(this.extendedDictionariesRegistry.values()).find(
					(extendedDictionary: IExtendedDictionary) => extendedDictionary.dictionary.isMain
				);

				mainExtendedDictionary!.itemsRegistry = new Map();

				this.activeExtendedDictionary = mainExtendedDictionary;
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, {
				error: err.body,
				errorOrigin: "[dictionaryStore]@loadDictionaries",
			});
		} finally {
			runInAction("loading dictionaries", () => {
				this.loadingInitial = false;
			});
		}
	};

	@action selectDictionary = (id: string) => {
		const itemStore = this.rootStore.itemStore;

		if (!this.rootStore.commonStore.newUser) {
			this.activeExtendedDictionary!.itemsRegistry = itemStore.itemRegistry;
			this.activeExtendedDictionary!.activeItem = itemStore.activeItem;
			this.activeExtendedDictionary!.queryParams = {
				page: itemStore.page,
				predicate: itemStore.predicate,
				queryResultSize: itemStore.queryResultSize,
			};
		}

		this.activeExtendedDictionary = this.extendedDictionariesRegistry.get(id);

		itemStore.itemRegistry = this.activeExtendedDictionary!.itemsRegistry ?? new Map();
		itemStore.activeItem = this.activeExtendedDictionary!.activeItem;
		itemStore.page = this.activeExtendedDictionary!.queryParams.page;
		itemStore.predicate = this.activeExtendedDictionary!.queryParams.predicate;

		if (!this.activeExtendedDictionary!.itemsRegistry) {
			itemStore.loadItems();
		}
	};

	@action createDictionary = async (dictionary: INewDictionary) => {
		this.submitting = true;
		try {
			const id = await agent.Dictionaries.create(dictionary);
			runInAction("creating dictionary", () => {
				if (dictionary.isMain) {
					this.extendedDictionariesRegistry.forEach(
						(extendedDictionary) => (extendedDictionary.dictionary.isMain = false)
					);
				}

				const newDictionary: IDictionary = {
					id: id,

					knownLanguage: getLanguageByISOCode(dictionary.knownLanguageCode),
					languageToLearn: getLanguageByISOCode(dictionary.languageToLearnCode),

					wordsCount: 0,
					phrasesCount: 0,
					learnedWordsCount: 0,
					learnedPhrasesCount: 0,

					preferredLearningListSize: dictionary.preferredLearningListSize,
					correctAnswersToItemCompletion: dictionary.correctAnswersToItemCompletion,

					isMain: dictionary.isMain,
					isHardModeEnabled: dictionary.isHardModeEnabled,
				};

				const newExtendedDictionary = {
					dictionary: newDictionary,
					itemsRegistry: new Map(),
					queryParams: { page: 0, predicate: new Map(), queryResultSize: 0 },
				};

				this.extendedDictionariesRegistry.set(id, newExtendedDictionary);

				if (dictionary.isMain) {
					this.selectDictionary(newDictionary.id);
				}
				createNotification(NotificationType.Success, { message: "Dictionary created successfully!" });

				if (this.rootStore.commonStore.newUser) {
					this.rootStore.commonStore.setNewUser(false);
				}

				history.push("/items-list");
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.code === ErrorType.DictionariesLimitReached) {
				createNotification(NotificationType.Error, {
					message: "Dictionaries limit has been reached! Maximum dictionaries number is 4.",
				});
			} else if (err.code === ErrorType.DuplicateDictionaryFound) {
				createNotification(NotificationType.Error, {
					title: "Validation error!",
					message: "Duplicate dictionary found! Please, refresh the page or contact the administrator.",
					error: err.body,
				});
			} else {
				console.log(err);
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[dictionaryStore]@createDictionary",
				});
			}
		} finally {
			runInAction("loading dictionaries", () => {
				this.submitting = false;
			});
		}
	};

	@action editDictionary = async (id: string, dictionary: IEditDictionary) => {
		this.submitting = true;
		try {
			await agent.Dictionaries.update(id, dictionary);
			runInAction("editing dictionary", () => {
				const editedDictionary = this.extendedDictionariesRegistry.get(id)!.dictionary;
				editedDictionary.preferredLearningListSize = dictionary.preferredLearningListSize;
				editedDictionary.correctAnswersToItemCompletion = dictionary.correctAnswersToItemCompletion;
				editedDictionary.isHardModeEnabled = dictionary.isHardModeEnabled;
				createNotification(NotificationType.Success, { message: "Dictionary updated successfully!" });
			});
			return true;
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, {
				error: err.body,
				errorOrigin: "[dictionaryStore]@editDictionary",
			});

			return false;
		} finally {
			runInAction("editing dictionary", () => {
				this.submitting = false;
			});
		}
	};

	@action deleteDictionary = async (id: string) => {
		this.deleting = true;
		try {
			await agent.Dictionaries.delete(id);
			runInAction("deleting dictionary", () => {
				this.extendedDictionariesRegistry.delete(id);

				if (this.activeExtendedDictionary!.dictionary.id === id) {
					this.selectDictionary(
						Array.from(this.extendedDictionariesRegistry.values()).find(
							(extendedDictionary) => extendedDictionary.dictionary.isMain
						)!.dictionary.id
					);
				}
			});

			return true;
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return false;
			}

			createNotification(NotificationType.UnknownError, {
				error: err.body,
				errorOrigin: "[dictionaryStore]@deleteDictionary",
			});

			return false;
		} finally {
			runInAction("deleting dictionary", () => {
				this.deleting = false;
			});
		}
	};

	@action setMainDictionary = async (id: string) => {
		this.loadingTarget = id;
		this.settingMain = true;
		try {
			await agent.Dictionaries.setMain(id);
			runInAction("setting main dictionary", () => {
				this.extendedDictionariesRegistry.forEach(
					(extendedDictionary) => (extendedDictionary.dictionary.isMain = false)
				);
				this.extendedDictionariesRegistry.get(id)!.dictionary.isMain = true;
				this.selectDictionary(id);
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, {
				error: err.body,
				errorOrigin: "[dictionaryStore]@setMainDictionary",
			});
		} finally {
			runInAction("setting main dictionary", () => {
				this.settingMain = false;
				this.loadingTarget = undefined;
			});
		}
	};
}
