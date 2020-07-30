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

	@action setAppLoaded = () => {
		this.appLoaded = true;
	};

	@action reset = () => {
		const userStore = this.rootStore.userStore;
		const dictionaryStore = this.rootStore.dictionaryStore;
		const itemStore = this.rootStore.itemStore;

		this.newUser = false;
		userStore.reset();
		dictionaryStore.reset();
		itemStore.reset();
	};

	@action onInitialLoad = async (withUser?: boolean) => {
		const userStore = this.rootStore.userStore;
		const dictionaryStore = this.rootStore.dictionaryStore;
		const itemStore = this.rootStore.itemStore;

		try {
			if (withUser) {
				await userStore.getUser();
			}
			await dictionaryStore.loadDictionaries();
			await itemStore.loadItems();
		} catch (err) {}
	};
}
