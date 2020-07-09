import ItemStore from "./itemStore";
import LearningStore from "./learningStore";
import { createContext } from "react";
import DictionaryStore from "./dictionaryStore";
import UserStore from "./userStore";

export class RootStore {
	itemStore: ItemStore;
	learningStore: LearningStore;
	dictionaryStore: DictionaryStore;
	userStore: UserStore;

	constructor() {
		this.itemStore = new ItemStore(this);
		this.learningStore = new LearningStore(this);
		this.dictionaryStore = new DictionaryStore(this);
		this.userStore = new UserStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
