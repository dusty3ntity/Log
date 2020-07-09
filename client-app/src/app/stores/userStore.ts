import { runInAction } from 'mobx';
import { observable, computed, action } from 'mobx';

import { RootStore } from './rootStore';
import { ILoginUser, IUser } from './../models/user';
import agent from '../api/agent';

export default class UserStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable user: IUser | null = null;

	@computed get isLoggedIn() {
		return !!this.user;
	}

	@action login = async (formData: ILoginUser) => {
		try {
			const user = await agent.Users.login(formData);
			runInAction("logging in", () => {
				this.user = user;
				console.log(user);
			})
		}
		catch(err) 
		{
			console.log(err);
		}
	}
}