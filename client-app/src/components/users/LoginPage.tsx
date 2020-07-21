import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import LoginForm from "./LoginForm";
import { RootStoreContext } from "../../app/stores/rootStore";
import { ILoginUser } from "../../app/models/user";

const LoginPage = () => {
	document.title = "Log in - Log";

	const rootStore = useContext(RootStoreContext);
	const { login, submitting, facebookLogin, googleLogin, loadingTarget } = rootStore.userStore;

	const onSubmit = (user: ILoginUser) => {
		login(user);
	};

	return (
		<div id="login-page" className="sign-page">
			<LoginForm
				onSubmit={onSubmit}
				submitting={submitting}
				facebookHandler={facebookLogin}
				googleHandler={googleLogin}
				loadingTarget={loadingTarget}
			/>
		</div>
	);
};

export default observer(LoginPage);
