import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { ISignFormProps } from "../../app/models/components";
import ValidationMessage from "../common/other/ValidationMessage";
import { IRegisterUser } from "../../app/models/user";
import {
	minLength,
	maxLength,
	isValidEmail,
	isValidPassword,
	isValidUsername,
} from "../../app/common/forms/formValidators";
import Button from "../common/inputs/Button";
import Divider from "../common/other/Divider";
// import FacebookButton from "./FacebookButton";
// import GoogleButton from "./GoogleButton";

export interface IRegistrationFormProps extends ISignFormProps {
	onSubmit: (user: IRegisterUser) => void;
}

const RegistrationForm: React.FC<IRegistrationFormProps> = ({
	onSubmit,
	submitting,
	facebookHandler,
	googleHandler,
	loadingTarget,
	...props
}) => {
	const { register, handleSubmit, errors, formState } = useForm<IRegisterUser>();

	const submit = (user: IRegisterUser) => {
		user.displayName = user.username;
		onSubmit(user);
	};

	return (
		<div id="registration-form" className="user-form" {...props}>
			<form onSubmit={handleSubmit(submit)}>
				<div className="title row">Register</div>

				<Divider />

				<div className="inputs-container row">
					<div className="form-item">
						<label htmlFor="email">Email</label>

						<ValidationMessage inputName="email" errors={errors} />

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
						<label htmlFor="username">Username</label>

						<ValidationMessage inputName="username" errors={errors} />

						<input
							type="text"
							name="username"
							autoComplete="username"
							maxLength={30}
							className="text-input"
							ref={register({
								required: "Username is required.",
								validate: {
									minLength: (value: string) => {
										return minLength(value, 3) ? "Username must be at least 3 characters." : true;
									},
									maxLength: (value: string) => {
										return maxLength(value, 20) ? "Username can be at most 20 characters." : true;
									},
									username: (value: string) => {
										const result = isValidUsername(value);
										if (result) return result;
										else return true;
									},
								},
							})}
						/>
					</div>

					<div className="form-item">
						<label htmlFor="password">Password</label>

						<ValidationMessage inputName="password" errors={errors} />

						<input
							type="password"
							name="password"
							autoComplete="new-password"
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
									password: (value: string) => {
										return isValidPassword(value)
											? "Password must contain at least one digit."
											: true;
									},
								},
							})}
						/>
					</div>
				</div>

				{/* <Divider text="OR" />

				<div className="external-providers-container row">
					<FacebookButton
						text="Register with Facebook"
						loading={submitting && loadingTarget === "facebook"}
						handler={facebookHandler}
						disabled={submitting}
					/>

					<GoogleButton
						text="Log in with Google"
						loading={submitting && loadingTarget === "google"}
						handler={googleHandler}
						disabled={submitting}
					/>
				</div> */}

				<Divider invisible />

				<div className="bottom-container row">
					<div className="prompt-container row">
						<span className="prompt">Already have an account?</span>

						<Link className="link" to="/login">
							Log in
						</Link>
					</div>

					<div className="actions-container row">
						<Button
							className="submit-btn"
							primary
							type="submit"
							text="Register"
							disabled={
								submitting || !formState.dirty || (formState.submitCount > 0 && !formState.isValid)
							}
							loading={submitting && loadingTarget === "register"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegistrationForm;
