import React, { useContext } from "react";

import RegistrationForm from "./RegistrationForm";
import { RootStoreContext } from "../../app/stores/rootStore";

const RegistrationPage = () => {
	const rootStore = useContext(RootStoreContext);
	const { register } = rootStore.userStore;

	return (
		<div id="registration-page" className="sign-page">
			<RegistrationForm onSubmit={register} />
		</div>
	);
};

export default RegistrationPage;
