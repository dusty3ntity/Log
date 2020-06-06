import { IItem, IEditItem, INewItem } from "./../models/item";
import { observable, action, runInAction, toJS, computed } from "mobx";
import { RootStore } from "./rootStore";
import agent from "../api/agent";

export default class ItemStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable loadingInitial = false;
	@observable loading = false;
	@observable editing = false;
	@observable itemRegistry = new Map();
	@observable activeItem: IItem | undefined;

	@action loadItems = async () => {
		this.loadingInitial = true;
		try {
			const items = await agent.Items.list();
			runInAction("loading items", () => {
				items.forEach((item) => {
					this.itemRegistry.set(item.id, item);
				});
			});
		} catch (err) {
			console.log(err);
		} finally {
			runInAction("loading items", () => {
				this.loadingInitial = false;
			});
		}
	};

	@action loadItem = async (id: string) => {
		this.loadingInitial = true;
		let item = this.getItem(id);
		if (item) {
			this.activeItem = item;
			return toJS(item);
		} else {
			try {
				item = await agent.Items.details(id);
				runInAction("getting item", () => {
					this.activeItem = item;
					this.itemRegistry.set(item.id, item);
				});
				return item;
			} catch (err) {
				console.log(err);
			} finally {
				runInAction("loading item", () => {
					this.loadingInitial = false;
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
		this.editing = false;
		this.activeItem = this.itemRegistry.get(id);
		this.showDetailsDrawer();
	};

	@action createItem = async (item: INewItem) => {
		this.loading = true;
		try {
			await agent.Items.create(item);
			console.log("Item created");
		} catch (err) {
			console.log(err.response);
		} finally {
			runInAction("creating item", () => (this.loading = false));
		}
	};

	@action editItem = async (id: string, editItem: IEditItem) => {
		this.loading = true;
		try {
			await agent.Items.update(id, editItem);
			runInAction("updating item", () => {
				this.activeItem!.original = editItem.original ?? this.activeItem!.original;
				this.activeItem!.translation = editItem.translation ?? this.activeItem!.translation;
				this.activeItem!.description = editItem.description ?? this.activeItem!.description;
				this.editing = false;
			});
		} catch (err) {
			console.log(err.response);
		} finally {
			runInAction("updating item", () => (this.loading = false));
		}
	};

	@action openEditor = () => {
		this.editing = true;
	};

	@action closeEditor = () => {
		this.editing = false;
	};

	@action deleteItem = async () => {
		this.loading = true;
		try {
			await agent.Items.delete(this.activeItem!.id);
			runInAction("deleting item", () => {
				this.itemRegistry.delete(this.activeItem!.id);
				this.clearActiveItem();
			});
		} catch (err) {
			console.log(err);
		} finally {
			runInAction("deleting item", () => (this.loading = false));
		}
	};

	@action clearActiveItem = () => {
		this.activeItem = undefined;
	};

	@action starItem = async () => {
		this.loading = true;
		try {
			await agent.Items.star(this.activeItem!.id);
			runInAction("starring item", () => {
				this.activeItem!.isStarred = true;
			});
		} catch (err) {
			console.log(err);
		} finally {
			runInAction("starring item", () => (this.loading = false));
		}
	};

	@action unstarItem = async () => {
		this.loading = true;
		try {
			await agent.Items.unstar(this.activeItem!.id);
			runInAction("unstarring item", () => {
				this.activeItem!.isStarred = false;
			});
		} catch (err) {
			console.log(err);
		} finally {
			runInAction("unstarring item", () => (this.loading = false));
		}
	};

	@observable filtersDrawerVisible = false;
	@observable detailsDrawerVisible = false;

	@action showFiltersDrawer = () => {
		this.filtersDrawerVisible = true;
	};

	@action hideFiltersDrawer = () => {
		this.filtersDrawerVisible = false;
	};

	@action showDetailsDrawer = () => {
		this.detailsDrawerVisible = true;
	};

	@action hideDetailsDrawer = () => {
		this.detailsDrawerVisible = false;
	};
}
