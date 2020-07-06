import ItemStore from "./itemStore";
import LearningStore from "./learningStore";
import { createContext } from "react";
import DictionariesStore from "./dictionariesStore";

export class RootStore {
	itemStore: ItemStore;
	learningStore: LearningStore;
	dictionariesStore: DictionariesStore;

	constructor() {
		this.itemStore = new ItemStore(this);
		this.learningStore = new LearningStore(this);
		this.dictionariesStore = new DictionariesStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
