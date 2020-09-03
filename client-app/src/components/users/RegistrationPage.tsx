import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { history } from "../..";

import RegistrationForm from "./RegistrationForm";
import { RootStoreContext } from "../../app/stores/rootStore";

const RegistrationPage: React.FC = ({ ...props }) => {
	document.title = "Register - Log";

	const rootStore = useContext(RootStoreContext);
	const { register, submitting, facebookLogin, googleLogin, loadingTarget, user } = rootStore.userStore;

	const pushOut = () => {
		if (user) {
			history.push("/items-list");
		}
	};

	useEffect(pushOut, []);

	return (
		<div id="registration-page" className="sign-page" {...props}>
			<RegistrationForm
				onSubmit={register}
				submitting={submitting}
				facebookHandler={facebookLogin}
				googleHandler={googleLogin}
				loadingTarget={loadingTarget}
			/>
		</div>
	);
};

export default observer(RegistrationPage);
