import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import ValidationMessage from "../common/forms/ValidationMessage";
import { ILoginUser } from "../../app/models/user";
import { minLength, maxLength, isEmail } from "../../app/common/forms/formValidators";

interface IProps {
	onSubmit: (user: ILoginUser) => void;
}

const LoginForm: React.FC<IProps> = ({ onSubmit }) => {
	const { register, handleSubmit, errors, formState } = useForm<ILoginUser>();

	return (
		<div id="login-form" className="user-form">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="title row">Log in</div>

				<div className="divider" />

				<div className="inputs-container row">
					<div className="form-item">
						<label htmlFor="email">Email</label>

						<ValidationMessage name="email" errors={errors} />

						<input
							type="text"
							name="email"
							maxLength={30}
							className="text-input"
							ref={register({
								required: "Email is required.",
								validate: {
									email: (value: string) => {
										return isEmail(value) ? "Your email is not valid." : true;
									},
								},
							})}
						/>
					</div>

					<div className="form-item">
						<label htmlFor="password">Password</label>

						<ValidationMessage name="password" errors={errors} />

						<input
							type="password"
							name="password"
							className="text-input"
							maxLength={30}
							ref={register({
								required: "Password is required.",
								validate: {
									minLength: (value: string) => {
										return minLength(value, 8) ? "Password must be at least 8 characters." : true;
									},
									maxLength: (value: string) => {
										return maxLength(value, 20) ? "Password can be at most 20 characters." : true;
									},
								},
							})}
						/>
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
						<button
							className="btn primary submit-btn"
							type="submit"
							disabled={!formState.dirty || (formState.submitCount > 0 && !formState.isValid)}
						>
							Log in
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
