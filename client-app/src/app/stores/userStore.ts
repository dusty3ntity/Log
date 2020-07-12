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

	@observable loading = false;
	@observable user: IUser | null = null;

	@computed get isLoggedIn() {
		return !!this.user;
	}

	@action login = async (formData: ILoginUser) => {
		this.loading = true;
		try {
			const user = await agent.Users.login(formData);
			runInAction("logging in", () => {
				this.user = user;
				this.rootStore.commonStore.setToken(user.token);
				history.push("/dashboard");
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.body.status === 401) {
				createNotification(NotificationType.Error, {
					message: "User's email or password are incorrect! Please, try again or contact the administrator.",
					errors: err.body,
				});
			} else {
				createNotification(NotificationType.UnknownError, { errors: err.body });
			}
		} finally {
			runInAction("logging in", () => {
				this.loading = false;
			});
		}
	};

	@action register = async (values: IRegisterUser) => {
		this.loading = true;
		try {
			const user = await agent.Users.register(values);
			runInAction("registering user", () => {
				this.user = user;
				this.rootStore.commonStore.setToken(user.token);
				history.push("/dashboard");
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.body.status === 400) {
				if (err.code === ErrorType.DuplicateEmailFound) {
					createNotification(NotificationType.Error, {
						message: "This email is already in use! Please, choose another one.",
						errors: err.body,
					});
				}
				if (err.code === ErrorType.DuplicateUsernameFound) {
					createNotification(NotificationType.Error, {
						message: "This username is already in use! Please, choose another one.",
						errors: err.body,
					});
				}
			} else {
				createNotification(NotificationType.UnknownError, { errors: err.body });
			}
		} finally {
			runInAction("registering user", () => {
				this.loading = false;
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
				return;
			}

			createNotification(NotificationType.UnknownError, { errors: err.body });
		}
	};

	@action logout = () => {
		this.rootStore.commonStore.setToken(null);
		this.user = null;
		history.push("/");
	};
}