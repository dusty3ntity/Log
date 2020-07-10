import React from "react";

import LoginForm from "./LoginForm";

const LoginPage = () => {
	document.title = "Log in - Log";

	return (
		<div id="login-page" className="sign-page">
			<LoginForm />
		</div>
	);
};

export default LoginPage;
