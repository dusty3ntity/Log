import { IDictionary } from "./../models/dictionary";
import { observable, action, runInAction, computed, reaction } from "mobx";
import { history } from "../..";

import { RootStore } from "./rootStore";
import agent from "../api/agent";
import { ErrorType, NotificationType } from "../models/error";
import { createNotification } from "./../common/util/notifications";

export default class DictionariesStore {
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
			} else {
				createNotification(NotificationType.UnknownError, { errors: err.body });
			}
		} finally {
			runInAction("loading dictionaries", () => {
				this.loadingInitial = false;
			});
		}
	};

	@action selectDictionary = (id: string) => {
		this.activeDictionary = this.dictionariesRegistry.get(id);
	};
}
