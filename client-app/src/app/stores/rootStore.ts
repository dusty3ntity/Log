import { createContext } from "react";
import { configure } from "mobx";

import ItemStore from "./itemStore";
import LearningStore from "./learningStore";
import DictionaryStore from "./dictionaryStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";

configure({ enforceActions: "always" });

export class RootStore {
	itemStore: ItemStore;
	learningStore: LearningStore;
	dictionaryStore: DictionaryStore;
	userStore: UserStore;
	commonStore: CommonStore;

	constructor() {
		this.itemStore = new ItemStore(this);
		this.learningStore = new LearningStore(this);
		this.dictionaryStore = new DictionaryStore(this);
		this.userStore = new UserStore(this);
		this.commonStore = new CommonStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
