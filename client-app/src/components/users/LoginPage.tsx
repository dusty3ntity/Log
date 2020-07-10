import React, { useContext } from "react";

import LoginForm from "./LoginForm";
import { RootStoreContext } from "../../app/stores/rootStore";
import { ILoginUser } from "../../app/models/user";

const LoginPage = () => {
	document.title = "Log in - Log";

	const rootStore = useContext(RootStoreContext);
	const { login } = rootStore.userStore;

	const onSubmit = (user: ILoginUser) => {
		login(user);
	};

	return (
		<div id="login-page" className="sign-page">
			<LoginForm onSubmit={onSubmit} />
		</div>
	);
};

export default LoginPage;
