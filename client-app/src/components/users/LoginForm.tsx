import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
	return (
		<div id="login-form" className="user-form">
			<div className="title row">Log in</div>

			<div className="divider" />

			<div className="inputs-container row">
				<div className="form-item">
					<label htmlFor="email">Email</label>

					<input type="email" name="email" className="text-input" />
				</div>

				<div className="form-item">
					<label htmlFor="password">Password</label>

					<input type="password" name="password" className="text-input" />
				</div>
			</div>

			{/* <div className="divider" />

			<div className="external-providers-container row">
				<button className="btn google-btn">Log in with Google</button>

				<button className="btn facebook-btn">Log in with Facebook</button>
			</div> */}

			<div className="additional-actions-container row"></div>

			<div className="bottom-container row">
				<div className="registration-container row">
					<span className="prompt">Don't have an account?</span>

					<Link className="registration-link" to="/register">
						Register
					</Link>
				</div>

				<div className="actions-container row">
					<button className="btn primary submit-btn" type="submit">
						Log in
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
