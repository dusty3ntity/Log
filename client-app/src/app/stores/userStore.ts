import { INewDictionary } from "./../models/dictionary";
import { runInAction } from "mobx";
import { observable, computed, action } from "mobx";
import { history } from "../..";

import { RootStore } from "./rootStore";
import { ILoginUser, IUser, IRegisterUser, IOnboardingFormData } from "./../models/user";
import agent from "../api/agent";
import { createNotification } from "./../common/util/notifications";
import { ErrorType, NotificationType } from "./../models/error";

export default class UserStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable submitting = false;
	@observable loadingTarget: string | undefined;

	@observable user: IUser | null = null;

	@computed get isLoggedIn() {
		return !!this.user;
	}

	@action login = async (formData: ILoginUser) => {
		this.loadingTarget = "login";
		this.submitting = true;
		try {
			const user = await agent.Users.login(formData);
			runInAction("logging in", () => {
				this.rootStore.commonStore.reset();
				this.user = user;
				this.rootStore.commonStore.setToken(user.token);
				this.rootStore.commonStore.setRefreshToken(user.refreshToken);
			});
			await this.rootStore.commonStore.onInitialLoad();
			history.push("/items-list");
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.body.status === 401) {
				createNotification(NotificationType.Error, {
					message: "User's email or password are incorrect! Please, try again or contact the administrator.",
					error: err.body,
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[userStore]~login",
				});
			}
		} finally {
			runInAction("logging in", () => {
				this.submitting = false;
				this.loadingTarget = undefined;
			});
		}
	};

	@action register = async (values: IRegisterUser) => {
		this.loadingTarget = "register";
		this.submitting = true;
		try {
			const user = await agent.Users.register(values);
			runInAction("registering user", () => {
				this.rootStore.commonStore.reset();
				this.user = user;
				this.rootStore.commonStore.setToken(user.token);
				this.rootStore.commonStore.setRefreshToken(user.refreshToken);
				this.rootStore.commonStore.setNewUser(true);
			});
			history.push("/before-we-begin");
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.body.status === 400) {
				if (err.code === ErrorType.DuplicateEmailFound) {
					createNotification(NotificationType.Error, {
						message: "This email is already in use! Please, choose another one.",
						error: err.body,
					});
				}
				if (err.code === ErrorType.DuplicateUsernameFound) {
					createNotification(NotificationType.Error, {
						message: "This username is already in use! Please, choose another one.",
						error: err.body,
					});
				}
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[userStore]~register",
				});
			}
		} finally {
			runInAction("registering user", () => {
				this.submitting = false;
				this.loadingTarget = undefined;
			});
		}
	};

	@action reset = () => {
		this.user = null;
	};

	@action onboardingFormSubmit = async (data: IOnboardingFormData) => {
		this.submitting = true;
		try {
			const newDictionary: INewDictionary = {
				knownLanguageCode: data.nativeLanguage.isoCode,
				languageToLearnCode: data.foreignLanguage.isoCode,
				correctAnswersToItemCompletion: 5,
				isHardModeEnabled: false,
				preferredLearningListSize: 50,
				isMain: true,
			};

			await agent.Dictionaries.create(newDictionary);
			await this.rootStore.commonStore.onInitialLoad();

			history.push("/items-list");
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.code === ErrorType.DictionariesLimitReached) {
				createNotification(NotificationType.Error, {
					message: "Dictionaries limit has been reached! Maximum dictionaries number is 4.",
				});
			} else if (err.code === ErrorType.DuplicateDictionaryFound) {
				createNotification(NotificationType.Error, {
					title: "Validation error!",
					message: "Duplicate dictionary found! Please, refresh the page or contact the administrator.",
					error: err.body,
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[userStore]~onboardingFormSubmit",
				});
			}
		} finally {
			runInAction("onboardingFormSubmit", () => {
				this.submitting = false;
			});
		}
	};

	@action getUser = async () => {
		try {
			const user = await agent.Users.current();
			runInAction(() => {
				this.user = user;
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				throw err;
			}

			createNotification(NotificationType.UnknownError, { error: err.body, errorOrigin: "[userStore]~getUser" });
		}
	};

	@action logout = () => {
		this.rootStore.commonStore.setToken(null);
		this.rootStore.commonStore.setRefreshToken(null);
		this.user = null;
		history.push("/login");
	};

	@action facebookLogin = async (response: any) => {
		this.loadingTarget = "facebook";
		this.submitting = true;

		try {
			const user = await agent.Users.facebookLogin(response.accessToken);
			runInAction("logging user in with facebook", () => {
				this.rootStore.commonStore.reset();
				this.user = user;
				this.rootStore.commonStore.setToken(user.token);
				this.rootStore.commonStore.setRefreshToken(user.refreshToken);
			});
			await this.rootStore.commonStore.onInitialLoad();

			history.push("/items-list");
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.body.status === 400) {
				if (err.code === ErrorType.DuplicateEmailFound) {
					createNotification(NotificationType.Error, {
						message: "This email is already in use! Please, choose another one.",
						error: err.body,
					});
				}
				if (err.code === ErrorType.DuplicateUsernameFound) {
					createNotification(NotificationType.Error, {
						message: "This username is already in use! Please, choose another one.",
						error: err.body,
					});
				}
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[userStore]~facebookLogin",
				});
			}
		} finally {
			runInAction("logging user in with facebook", () => {
				this.submitting = false;
				this.loadingTarget = undefined;
			});
		}
	};

	@action googleLogin = async (response: any) => {
		this.loadingTarget = "google";
		this.submitting = true;

		try {
			const user = await agent.Users.googleLogin(response.code);
			runInAction("logging user in with google", () => {
				this.rootStore.commonStore.reset();
				this.user = user;
				this.rootStore.commonStore.setToken(user.token);
				this.rootStore.commonStore.setRefreshToken(user.refreshToken);
			});
			await this.rootStore.commonStore.onInitialLoad();

			history.push("/items-list");
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.body.status === 400) {
				if (err.code === ErrorType.DuplicateEmailFound) {
					createNotification(NotificationType.Error, {
						message: "This email is already in use! Please, choose another one.",
						error: err.body,
					});
				}
				if (err.code === ErrorType.DuplicateUsernameFound) {
					createNotification(NotificationType.Error, {
						message: "This username is already in use! Please, choose another one.",
						error: err.body,
					});
				}
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[userStore]~googleLogin",
				});
			}
		} finally {
			runInAction("logging user in with google", () => {
				this.submitting = false;
				this.loadingTarget = undefined;
			});
		}
	};
}
