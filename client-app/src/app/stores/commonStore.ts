import { observable, action, reaction } from "mobx";

import { RootStore } from "./rootStore";

export default class CommonStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		reaction(
			() => this.token,
			(token) => {
				if (token) {
					window.localStorage.setItem("jwt", token);
				} else {
					window.localStorage.removeItem("jwt");
				}
			}
		);

		reaction(
			() => this.refreshToken,
			(refreshToken) => {
				if (refreshToken) {
					window.localStorage.setItem("refreshToken", refreshToken);
				} else {
					window.localStorage.removeItem("refreshToken");
				}
			}
		);
	}

	@observable token: string | null = window.localStorage.getItem("jwt");
	@observable refreshToken: string | null = window.localStorage.getItem("refreshToken");
	@observable appLoaded = false;
	@observable newUser = false;

	@action setToken = (token: string | null) => {
		window.localStorage.setItem("jwt", token!);
		this.token = token;
	};

	@action setNewUser = (value: boolean) => {
		this.newUser = value;
	};

	@action setRefreshToken = (refreshToken: string | null) => {
		window.localStorage.setItem("refreshToken", refreshToken!);
		this.refreshToken = refreshToken;
	};

	@action onInitialLoad = async () => {
		const itemStore = this.rootStore.itemStore;
		const dictionaryStore = this.rootStore.dictionaryStore;
		const userStore = this.rootStore.userStore;
		this.setNewUser(false);
		dictionaryStore.reset();
		itemStore.reset();
		try {
			await userStore.getUser();
			await dictionaryStore.loadDictionaries();
			await itemStore.loadItems();
		} catch (err) {}
	};

	@action setAppLoaded = () => {
		this.appLoaded = true;
	};
}
