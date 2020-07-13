import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import ValidationMessage from "../common/forms/ValidationMessage";
import { ILoginUser } from "../../app/models/user";
import { minLength, maxLength, isValidEmail } from "../../app/common/forms/formValidators";
import Button from "../common/inputs/Button";

interface IProps {
	onSubmit: (user: ILoginUser) => void;
	submitting: boolean;
}

const LoginForm: React.FC<IProps> = ({ onSubmit, submitting }) => {
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
										return isValidEmail(value) ? "Your email is not valid." : true;
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

				<div className="divider invisible" />

				<div className="additional-actions-container row"></div>

				<div className="bottom-container row">
					<div className="registration-container row">
						<span className="prompt">Don't have an account?</span>

						<Link className="registration-link" to="/registration">
							Registration
						</Link>
					</div>

					<div className="actions-container row">
						<Button
							className="submit-btn"
							primary
							type="submit"
							text="Log in"
							disabled={!formState.dirty || (formState.submitCount > 0 && !formState.isValid)}
							loading={submitting}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
