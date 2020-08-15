import { observable, action, runInAction, computed, toJS } from "mobx";
import { history } from "../..";

import { RootStore } from "./rootStore";
import { IItem, IEditItem, INewItem, ItemType, IItemsEnvelope } from "./../models/item";
import agent from "../api/agent";
import { createNotification } from "../common/util/notifications";
import { NotificationType, ErrorType } from "./../models/error";
import { matchesFilters } from "./../common/util/filters";

const LIMIT = 20;

export default class ItemStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable loadingInitial = false;
	@observable loadingNext = false;
	@observable loadingItem = false;
	@observable submitting = false;
	@observable deleting = false;
	@observable starring = false;

	@observable loadingTarget: string[] = [];

	@observable itemRegistry = new Map<string, IItem>();
	@observable activeItem: IItem | undefined;

	@observable page = 0;
	@observable queryResultSize = 0;
	@observable predicate = new Map<string, any>();

	@action setPredicate = (key: string, value: any) => {
		this.itemRegistry.clear();

		if (value === undefined) {
			this.predicate.delete(key);
		} else {
			this.predicate.set(key, value.toString());
		}

		this.page = 0;
		this.loadItems();
	};

	@computed get loadItemsAxiosParams() {
		const params = new URLSearchParams();

		params.append("limit", LIMIT.toString());
		params.append("offset", `${this.page ? this.page * LIMIT : 0}`);

		this.predicate.forEach((value, key) => {
			params.append(key, value);
		});
		return params;
	}

	@action reset = () => {
		this.itemRegistry = new Map();
		this.activeItem = undefined;
		this.page = 0;
		this.predicate = new Map();
		this.queryResultSize = 0;
	};

	@computed get totalPages() {
		return Math.ceil(this.queryResultSize / LIMIT);
	}

	@action setPage = (page: number) => {
		this.page = page;
	};

	@action loadItems = async () => {
		if (this.rootStore.commonStore.newUser) {
			return;
		}
		
		if (this.page === 0) {
			this.loadingInitial = true;
		} else {
			this.loadingNext = true;
		}
		try {
			const itemsEnvelope: IItemsEnvelope = await agent.Items.list(
				this.rootStore.dictionaryStore.activeDictionaryId!,
				this.loadItemsAxiosParams
			);
			runInAction("loading items", () => {
				this.queryResultSize = itemsEnvelope.queryResultSize;

				itemsEnvelope.items.forEach((item) => {
					item.creationDate = new Date(item.creationDate);
					this.itemRegistry.set(item.id, item);
				});
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, {
				error: err.body,
				errorOrigin: "[itemStore]~loadItems",
			});
		} finally {
			runInAction("loading items", () => {
				if (this.page === 0) {
					this.loadingInitial = false;
				} else {
					this.loadingNext = false;
				}
			});
		}
	};

	@action loadItem = async (id: string) => {
		let item = this.getItem(id);
		if (item) {
			this.activeItem = item;
			return item;
		} else {
			this.loadingItem = true;
			try {
				item = await agent.Items.details(this.rootStore.dictionaryStore.activeDictionaryId!, id);
				runInAction("getting item", () => {
					item!.creationDate = new Date(item!.creationDate);
					this.activeItem = item;
					this.itemRegistry.set(item!.id, item!);
				});
				return item;
			} catch (err) {
				if (err.code < ErrorType.DefaultErrorsBlockEnd) {
					return;
				}

				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[itemStore]~loadItem",
				});
			} finally {
				runInAction("loading item", () => {
					this.loadingItem = false;
				});
			}
		}
	};

	getItem = (id: string) => {
		return this.itemRegistry.get(id);
	};

	@computed get itemsByDate() {
		return this.groupItemsByDate(Array.from(this.itemRegistry.values()));
	}

	groupItemsByDate(items: IItem[]) {
		const sortedItems = items.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime());
		return Object.entries(
			sortedItems.reduce((items, item) => {
				const date = item.creationDate.toISOString().split("T")[0];
				items[date] = items[date] ? [...items[date], item] : [item];
				return items;
			}, {} as { [key: string]: IItem[] })
		);
	}

	@action selectItem = (id: string) => {
		this.activeItem = this.itemRegistry.get(id);
		this.showDetailsDrawer();
	};

	@action createItem = async (newItem: INewItem) => {
		this.submitting = true;
		try {
			const id = await agent.Items.create(this.rootStore.dictionaryStore.activeDictionaryId, newItem);
			runInAction("creating item", () => {
				if (newItem.type === ItemType.Word) {
					this.rootStore.dictionaryStore.activeDictionary.wordsCount++;
				} else {
					this.rootStore.dictionaryStore.activeDictionary.phrasesCount++;
				}

				const item: IItem = {
					id: id,

					original: newItem.original,
					translation: newItem.translation,
					definition: newItem.definition,
					definitionOrigin: newItem.definitionOrigin,
					type: newItem.type,
					creationDate: new Date(),

					isStarred: newItem.isStarred,
					isLearned: false,

					totalRepeatsCount: 0,
					correctAnswersCount: 0,
					correctAnswersToCompletionCount: 0,
				};

				if (matchesFilters(item, toJS(this.predicate, { exportMapsAsObjects: false }))) {
					this.itemRegistry.set(id, item);
				}

				createNotification(NotificationType.Success, { message: "Item created successfully!" });
			});
			return true;
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return false;
			}

			if (err.code === ErrorType.ItemsLimitReached) {
				createNotification(NotificationType.Error, {
					message: "Items limit has been reached! Maximum items number is 8000.",
					analyticsErrorDescription: "Items limit reached",
				});
			} else if (err.code === ErrorType.ItemOriginalOrTranslationContainEachOther) {
				createNotification(NotificationType.Error, {
					message:
						"Item's original or translation contain each other. Contact the administrator if I'm wrong.",
					error: err.body,
					analyticsErrorDescription: "Item's original or translation contain each other",
				});
			} else if (err.code === ErrorType.ItemDefinitionContainsOriginalOrTranslation) {
				createNotification(NotificationType.Error, {
					message:
						"Item's definition contains either original or translation. Contact the administrator if I'm wrong.",
					error: err.body,
					analyticsErrorDescription: "Item's definition contains either original or translation",
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[itemStore]~createItem",
				});
			}

			return false;
		} finally {
			runInAction("creating item", () => (this.submitting = false));
		}
	};

	@action editItem = async (id: string, editItem: IEditItem) => {
		this.submitting = true;
		try {
			await agent.Items.update(this.rootStore.dictionaryStore.activeDictionaryId!, id, editItem);
			runInAction("updating item", () => {
				if (
					editItem.original !== this.activeItem!.original ||
					editItem.translation !== this.activeItem!.translation
				) {
					if (this.activeItem!.isLearned) {
						if (this.activeItem!.type === ItemType.Word) {
							this.rootStore.dictionaryStore.activeDictionary.learnedWordsCount--;
						} else {
							this.rootStore.dictionaryStore.activeDictionary.learnedPhrasesCount--;
						}
					}

					this.activeItem!.isLearned = false;
					this.activeItem!.correctAnswersToCompletionCount = 0;
					this.activeItem!.creationDate = new Date();
				}

				this.activeItem!.original = editItem.original;
				this.activeItem!.translation = editItem.translation;
				this.activeItem!.definition = editItem.definition;
				this.activeItem!.definitionOrigin = editItem.definitionOrigin;

				history.push("/items-list");
				createNotification(NotificationType.Success, { message: "Item updated successfully!" });
			});
			return true;
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return false;
			}

			if (err.code === ErrorType.ItemOriginalOrTranslationContainEachOther) {
				createNotification(NotificationType.Error, {
					message:
						"Item's original or translation contain each other. Contact the administrator if I'm wrong.",
					error: err.body,
					analyticsErrorDescription: "Item's original or translation contain each other",
				});
			} else if (err.code === ErrorType.ItemDefinitionContainsOriginalOrTranslation) {
				createNotification(NotificationType.Error, {
					message:
						"Item's definition contains either original or translation. Contact the administrator if I'm wrong.",
					error: err.body,
					analyticsErrorDescription: "Item's definition contains either original or translation",
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[itemStore]~editItem",
				});
			}

			return false;
		} finally {
			runInAction("updating item", () => (this.submitting = false));
		}
	};

	@action deleteItem = async () => {
		this.deleting = true;
		try {
			await agent.Items.delete(this.rootStore.dictionaryStore.activeDictionaryId!, this.activeItem!.id);
			runInAction("deleting item", () => {
				if (this.activeItem!.type === ItemType.Word) {
					this.rootStore.dictionaryStore.activeDictionary.wordsCount--;
				} else {
					this.rootStore.dictionaryStore.activeDictionary.phrasesCount--;
				}
				this.itemRegistry.delete(this.activeItem!.id);
				this.detailsDrawerVisible = false;
				this.clearActiveItem();
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, {
				error: err.body,
				errorOrigin: "[itemStore]~deleteItem",
			});
		} finally {
			runInAction("deleting item", () => (this.deleting = false));
		}
	};

	@action clearActiveItem = () => {
		this.activeItem = undefined;
	};

	@action starItemById = async (id: string) => {
		this.loadingTarget.push(id);
		this.starring = true;
		try {
			await agent.Items.star(this.rootStore.dictionaryStore.activeDictionaryId!, id);
			runInAction("starring item", () => {
				const item = this.itemRegistry.get(id)!;
				item.isStarred = true;
				this.rootStore.dictionaryStore.activeDictionary.starredItemsCount++;

				if (item.isLearned) {
					item.isLearned = false;
					item.correctAnswersToCompletionCount = 0;
				}
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, {
				error: err.body,
				errorOrigin: "[itemStore]~starItemById",
			});
		} finally {
			runInAction("starring item", () => {
				this.starring = false;
				this.loadingTarget.splice(this.loadingTarget.indexOf(id), 1);
			});
		}
	};

	@action starItem = async () => {
		this.starItemById(this.activeItem!.id);
	};

	@action unstarItemById = async (id: string) => {
		this.loadingTarget.push(id);
		this.starring = true;
		try {
			await agent.Items.unstar(this.rootStore.dictionaryStore.activeDictionaryId!, id);
			runInAction("unstarring item", () => {
				this.itemRegistry.get(id)!.isStarred = false;
				this.rootStore.dictionaryStore.activeDictionary.starredItemsCount--;
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, {
				error: err.body,
				errorOrigin: "[itemStore]~unstarItemById",
			});
		} finally {
			runInAction("unstarring item", () => {
				this.starring = false;
				this.loadingTarget.splice(this.loadingTarget.indexOf(id), 1);
			});
		}
	};

	@action unstarItem = async () => {
		this.unstarItemById(this.activeItem!.id);
	};

	@observable filtersDrawerVisible = false;
	@observable detailsDrawerVisible = false;

	@action showFiltersDrawer = () => {
		this.detailsDrawerVisible = false;
		this.filtersDrawerVisible = true;
	};

	@action hideFiltersDrawer = () => {
		this.filtersDrawerVisible = false;
	};

	@action showDetailsDrawer = () => {
		this.filtersDrawerVisible = false;
		this.detailsDrawerVisible = true;
	};

	@action hideDetailsDrawer = () => {
		this.detailsDrawerVisible = false;
	};
}
