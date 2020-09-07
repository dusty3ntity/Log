import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { ISignFormProps } from "../../app/models/components";
import ValidationMessage from "../common/other/ValidationMessage";
import { ILoginUser } from "../../app/models/user";
import { minLength, maxLength, isValidEmail } from "../../app/common/forms/formValidators";
import Button from "../common/inputs/Button";
import Divider from "../common/other/Divider";
// import FacebookButton from "./FacebookButton";
// import GoogleButton from "./GoogleButton";

export interface ILoginFormProps extends ISignFormProps {
	onSubmit: (user: ILoginUser) => void;
}

const LoginForm: React.FC<ILoginFormProps> = ({
	onSubmit,
	submitting,
	facebookHandler,
	googleHandler,
	loadingTarget,
	...props
}) => {
	const { register, handleSubmit, errors, formState } = useForm<ILoginUser>();

	return (
		<div id="login-form" className="user-form" {...props}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="title row">Log in</div>

				<Divider />

				<div className="inputs-container row">
					<div className="form-item">
						<label htmlFor="email">Email</label>

						<ValidationMessage inputName="email" errors={errors} />

						<input
							type="text"
							name="email"
							autoComplete="username"
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

						<ValidationMessage inputName="password" errors={errors} />

						<input
							type="password"
							name="password"
							autoComplete="current-password"
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

				{/* <Divider text="OR" />

				<div className="external-providers-container row">
					<FacebookButton
						text="Log in with Facebook"
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

				<div className="additional-actions-container row"></div>

				<div className="bottom-container row">
					<div className="prompt-container row">
						<span className="prompt">Don't have an account?</span>

						<Link className="link" to="/register">
							Register
						</Link>
					</div>

					<div className="actions-container row">
						<Button
							className="submit-btn"
							primary
							type="submit"
							text="Log in"
							disabled={
								submitting || !formState.dirty || (formState.submitCount > 0 && !formState.isValid)
							}
							loading={submitting && loadingTarget === "login"}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
