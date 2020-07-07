import { observable, action, runInAction, computed, reaction } from "mobx";
import { history } from "../..";

import { RootStore } from "./rootStore";
import { IDictionary, INewDictionary, IEditDictionary } from "./../models/dictionary";
import agent from "../api/agent";
import { ErrorType, NotificationType } from "../models/error";
import { createNotification } from "../common/util/notifications";
import { getLanguageByISOCode } from "./../models/languages";

export default class DictionaryStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		reaction(
			() => this.activeDictionary,
			async () => {
				if (history.location.pathname.includes("/dashboard")) {
					await rootStore.itemStore.loadItems();
				} else if (history.location.pathname.includes("/learning")) {
					await rootStore.learningStore.onInitialLoad();
				}
			}
		);
	}

	@observable loadingInitial = true;
	@observable loading = false;
	@observable dictionariesRegistry = new Map();
	@observable activeDictionary: IDictionary | undefined;

	@computed get activeDictionaryId() {
		return this.activeDictionary?.id;
	}

	@action loadDictionaries = async () => {
		this.loadingInitial = true;
		try {
			const dictionaries = await agent.Dictionaries.list();
			runInAction("loading dictionaries", () => {
				dictionaries.forEach((dictionary) => {
					this.dictionariesRegistry.set(dictionary.id, dictionary);
				});
				if (!this.activeDictionary) {
					this.activeDictionary = dictionaries.find((dictionary) => dictionary.isMain);
				}
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, { errors: err.body });
		} finally {
			runInAction("loading dictionaries", () => {
				this.loadingInitial = false;
			});
		}
	};

	@action selectDictionary = (id: string) => {
		this.activeDictionary = this.dictionariesRegistry.get(id);
	};

	@action createDictionary = async (dictionary: INewDictionary) => {
		this.loading = true;
		try {
			const id = await agent.Dictionaries.create(dictionary);
			runInAction("creating dictionary", () => {
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
				this.dictionariesRegistry.set(id, newDictionary);

				if (dictionary.isMain) {
					this.activeDictionary = newDictionary;
				}
				createNotification(NotificationType.Success, { message: "Dictionary created successfully!" });
				history.push("/dashboard");
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
					errors: err.body,
				});
			} else {
				createNotification(NotificationType.UnknownError, { errors: err.body });
			}
		} finally {
			runInAction("loading dictionaries", () => {
				this.loading = false;
			});
		}
	};

	@action editDictionary = async (id: string, dictionary: IEditDictionary) => {};

	@action deleteDictionary = async (id: string) => {};
}
