import ItemStore from "./itemStore";
import LearningStore from "./learningStore";
import { createContext } from "react";
import DictionaryStore from "./dictionaryStore";

export class RootStore {
	itemStore: ItemStore;
	learningStore: LearningStore;
	dictionaryStore: DictionaryStore;

	constructor() {
		this.itemStore = new ItemStore(this);
		this.learningStore = new LearningStore(this);
		this.dictionaryStore = new DictionaryStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
