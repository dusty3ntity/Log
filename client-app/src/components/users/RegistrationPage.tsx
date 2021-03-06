import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import RegistrationForm from "./RegistrationForm";
import { RootStoreContext } from "../../app/stores/rootStore";

const RegistrationPage: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { register, submitting, facebookLogin, googleLogin, loadingTarget } = rootStore.userStore;

	useEffect(() => {
		document.title = "Register - Log";
	}, []);

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
