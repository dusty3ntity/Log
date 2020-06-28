import ItemStore from "./itemStore";
import LearningStore from "./learningStore";
import { createContext } from "react";

export class RootStore {
	itemStore: ItemStore;
	learningStore: LearningStore;

	constructor() {
		this.itemStore = new ItemStore(this);
		this.learningStore = new LearningStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
