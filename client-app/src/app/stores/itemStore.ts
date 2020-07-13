import { observable, action, runInAction, computed } from "mobx";

import { RootStore } from "./rootStore";
import { IItem, IEditItem, INewItem, ItemType } from "./../models/item";
import agent from "../api/agent";
import { createNotification } from "../common/util/notifications";
import { NotificationType, ErrorType } from "./../models/error";
import { history } from "../..";

export default class ItemStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable loadingInitial = false;
	@observable loading = false;
	@observable submitting = false;
	@observable deleting = false;
	@observable starring = false;

	@observable loadingTarget: string | undefined = undefined;

	@observable itemRegistry = new Map();
	@observable activeItem: IItem | undefined;

	@action loadItems = async () => {
		this.loadingInitial = true;
		try {
			const items = await agent.Items.list(this.rootStore.dictionaryStore.activeDictionaryId!);
			runInAction("loading items", () => {
				this.itemRegistry = new Map();
				items.forEach((item) => {
					this.itemRegistry.set(item.id, item);
				});
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, { errors: err.body });
		} finally {
			runInAction("loading items", () => {
				this.loadingInitial = false;
			});
		}
	};

	@action loadItem = async (id: string) => {
		this.loading = true;
		let item = this.getItem(id);
		if (item) {
			this.activeItem = item;
		} else {
			try {
				item = await agent.Items.details(this.rootStore.dictionaryStore.activeDictionaryId!, id);
				runInAction("getting item", () => {
					this.activeItem = item;
					this.itemRegistry.set(item.id, item);
				});
				return item;
			} catch (err) {
				if (err.code < ErrorType.DefaultErrorsBlockEnd) {
					return;
				}

				createNotification(NotificationType.UnknownError, { errors: err.body });
			} finally {
				runInAction("loading item", () => {
					this.loading = false;
				});
			}
		}
	};

	getItem = (id: string) => {
		return this.itemRegistry.get(id);
	};

	@computed get itemsByDate() {
		let items = Array.from(this.itemRegistry.values());
		return items;
	}

	@action selectItem = (id: string) => {
		this.activeItem = this.itemRegistry.get(id);
		this.showDetailsDrawer();
	};

	@action createItem = async (item: INewItem) => {
		this.submitting = true;
		try {
			await agent.Items.create(this.rootStore.dictionaryStore.activeDictionaryId!, item);
			runInAction("creating item", () => {
				if (item.type === ItemType.Word) {
					this.rootStore.dictionaryStore.activeDictionary!.wordsCount++;
				} else {
					this.rootStore.dictionaryStore.activeDictionary!.phrasesCount++;
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
				});
			} else if (err.code === ErrorType.ItemOriginalOrTranslationContainEachOther) {
				createNotification(NotificationType.Error, {
					message:
						"Item's original or translation contain each other. Contact the administrator if I'm wrong.",
					errors: err.body,
				});
			} else if (err.code === ErrorType.ItemDefinitionContainsOriginalOrTranslation) {
				createNotification(NotificationType.Error, {
					message:
						"Item's definition contains either original or translation. Contact the administrator if I'm wrong.",
					errors: err.body,
				});
			} else {
				createNotification(NotificationType.UnknownError, { errors: err.body });
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
				this.activeItem!.original = editItem.original;
				this.activeItem!.translation = editItem.translation;
				this.activeItem!.definition = editItem.definition;
				this.activeItem!.definitionOrigin = editItem.definitionOrigin;
				history.push("/dashboard");
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
					errors: err.body,
				});
			} else if (err.code === ErrorType.ItemDefinitionContainsOriginalOrTranslation) {
				createNotification(NotificationType.Error, {
					message:
						"Item's definition contains either original or translation. Contact the administrator if I'm wrong.",
					errors: err.body,
				});
			} else {
				createNotification(NotificationType.UnknownError, { errors: err.body });
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
					this.rootStore.dictionaryStore.activeDictionary!.wordsCount--;
				} else {
					this.rootStore.dictionaryStore.activeDictionary!.phrasesCount--;
				}
				this.itemRegistry.delete(this.activeItem!.id);
				this.detailsDrawerVisible = false;
				this.clearActiveItem();
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, { errors: err.body });
		} finally {
			runInAction("deleting item", () => (this.deleting = false));
		}
	};

	@action clearActiveItem = () => {
		this.activeItem = undefined;
	};

	@action starItemById = async (id: string) => {
		this.loadingTarget = id;
		this.starring = true;
		try {
			await agent.Items.star(this.rootStore.dictionaryStore.activeDictionaryId!, id);
			runInAction("starring item", () => {
				this.itemRegistry.get(id).isStarred = true;
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, { errors: err.body });
		} finally {
			runInAction("starring item", () => {
				this.starring = false;
				this.loadingTarget = undefined;
			});
		}
	};

	@action starItem = async () => {
		this.starItemById(this.activeItem!.id);
	};

	@action unstarItemById = async (id: string) => {
		this.loadingTarget = id;
		this.starring = true;
		try {
			await agent.Items.unstar(this.rootStore.dictionaryStore.activeDictionaryId!, id);
			runInAction("unstarring item", () => {
				this.itemRegistry.get(id).isStarred = false;
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			createNotification(NotificationType.UnknownError, { errors: err.body });
		} finally {
			runInAction("unstarring item", () => {
				this.starring = false;
				this.loadingTarget = undefined;
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
