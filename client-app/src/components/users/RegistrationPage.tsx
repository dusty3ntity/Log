import React from "react";

import RegistrationForm from "./RegistrationForm";
import { IRegisterUser } from "../../app/models/user";

const RegistrationPage = () => {
	const onSubmit = (user: IRegisterUser) => {
		console.log(user);
	};

	return (
		<div id="registration-page" className="sign-page">
			<RegistrationForm onSubmit={onSubmit} />
		</div>
	);
};

export default RegistrationPage;
