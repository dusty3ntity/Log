import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import RegistrationForm from "./RegistrationForm";
import { RootStoreContext } from "../../app/stores/rootStore";

const RegistrationPage = () => {
	const rootStore = useContext(RootStoreContext);
	const { register, submitting } = rootStore.userStore;

	return (
		<div id="registration-page" className="sign-page">
			<RegistrationForm onSubmit={register} submitting={submitting} />
		</div>
	);
};

export default observer(RegistrationPage);
