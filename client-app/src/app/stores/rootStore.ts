import ItemStore from "./itemStore";
import { createContext } from "react";

export class RootStore {
	itemStore: ItemStore;

	constructor() {
		this.itemStore = new ItemStore(this);
	}
}

export const RootStoreContext = createContext(new RootStore());
