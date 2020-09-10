import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { history } from "../..";

import LoginForm from "./LoginForm";
import { RootStoreContext } from "../../app/stores/rootStore";
import { ILoginUser } from "../../app/models/user";

const LoginPage: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { login, submitting, facebookLogin, googleLogin, loadingTarget, user } = rootStore.userStore;

	useEffect(() => {
		document.title = "Log in - Log";
	}, []);

	if (user) {
		history.push("/items-list");
		return null;
	}

	const onSubmit = (user: ILoginUser) => {
		login(user);
	};

	return (
		<div id="login-page" className="sign-page" {...props}>
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
