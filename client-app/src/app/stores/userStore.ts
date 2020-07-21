import { runInAction } from "mobx";
import { observable, computed, action } from "mobx";
import { history } from "../..";

import { RootStore } from "./rootStore";
import { ILoginUser, IUser, IRegisterUser } from "./../models/user";
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
					errorOrigin: "[userStore]@login",
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
				this.user = user;
				this.rootStore.commonStore.setToken(user.token);
				this.rootStore.commonStore.setRefreshToken(user.refreshToken);
			});
			await this.rootStore.commonStore.onInitialLoad();
			history.push("/new-dictionary");
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
					errorOrigin: "[userStore]@register",
				});
			}
		} finally {
			runInAction("registering user", () => {
				this.submitting = false;
				this.loadingTarget = undefined;
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

			createNotification(NotificationType.UnknownError, { error: err.body, errorOrigin: "[userStore]@getUser" });
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
					errorOrigin: "[userStore]@facebookLogin",
				});
			}
		} finally {
			runInAction("logging user in with facebook", () => {
				this.submitting = false;
				this.loadingTarget = undefined;
			});
		}
	};
}
