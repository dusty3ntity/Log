import React, { useState } from "react";
import { useForm } from "react-hook-form";

import ValidationMessage from "../common/forms/ValidationMessage";
import { IRegisterUser } from "../../app/models/user";
import UserIcon from "../icons/UserIcon";
import DictionaryIcon from "../icons/DictionaryIcon";
import LanguagesList from "../dictionaries/LanguagesList";
import {
	minLength,
	maxLength,
	isValidEmail,
	isValidPassword,
	isValidUsername,
} from "../../app/common/forms/formValidators";
import { ILanguage } from "../../app/models/dictionary";
import Button from "../common/inputs/Button";

interface IProps {
	onSubmit: (user: IRegisterUser) => void;
	submitting: boolean;
}

const RegistrationForm: React.FC<IProps> = ({ onSubmit, submitting }) => {
	const { register, handleSubmit, errors, formState } = useForm<IRegisterUser>();

	const [selectedTab, selectTab] = useState(0);

	const [selectedNativeLanguage, selectNativeLanguage] = useState<ILanguage | undefined>(undefined);
	const [selectedForeignLanguage, selectForeignLanguage] = useState<ILanguage | undefined>(undefined);

	const submit = (user: IRegisterUser) => {
		if (selectedTab === 0) {
			selectTab(1);
		} else {
			user.nativeLanguageCode = selectedNativeLanguage!.isoCode;
			user.languageToLearnCode = selectedForeignLanguage!.isoCode;
			user.displayName = user.username;
			onSubmit(user);
		}
	};

	return (
		<div id="registration-form" className="user-form">
			<form onSubmit={handleSubmit(submit)}>
				<div className="title row">Registration</div>

				<div className="divider" />

				<div className="tabs-container">
					<div className={`tab first-tab ${selectedTab === 1 ? "hidden" : ""}`}>
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
								<label htmlFor="username">Username</label>

								<ValidationMessage name="username" errors={errors} />

								<input
									type="text"
									name="username"
									maxLength={30}
									className="text-input"
									ref={register({
										required: "Username is required.",
										validate: {
											minLength: (value: string) => {
												return minLength(value, 3)
													? "Username must be at least 3 characters."
													: true;
											},
											maxLength: (value: string) => {
												return maxLength(value, 20)
													? "Username can be at most 20 characters."
													: true;
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
												return minLength(value, 8)
													? "Password must be at least 8 characters."
													: true;
											},
											maxLength: (value: string) => {
												return maxLength(value, 20)
													? "Password can be at most 20 characters."
													: true;
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

						{/* <div className="divider" />

						<div className="external-providers-container row">
							<button className="btn google-btn">Log in with Google</button>

							<button className="btn facebook-btn">Log in with Facebook</button>
						</div> */}
					</div>

					<div className={`tab second-tab ${selectedTab === 0 ? "hidden" : ""}`}>
						<LanguagesList
							id="native-language"
							title="Native language:"
							selectedItem={selectedNativeLanguage}
							disabledItems={selectedForeignLanguage ? [selectedForeignLanguage] : []}
							onItemSelect={(language: ILanguage) => selectNativeLanguage(language)}
						/>

						<LanguagesList
							id="foreign-language"
							title="Foreign language:"
							selectedItem={selectedForeignLanguage}
							disabledItems={selectedNativeLanguage ? [selectedNativeLanguage] : []}
							onItemSelect={(language: ILanguage) => selectForeignLanguage(language)}
						/>
					</div>
				</div>

				<div className="divider invisible" />

				<div className="actions-container row">
					<div className="tab-btns-container">
						<div className={`tab-btn first-tab-btn ${selectedTab === 0 ? "active" : ""}`}>
							<UserIcon />
						</div>
						<div className={`tab-btn second-tab-btn ${selectedTab === 1 ? "active" : ""}`}>
							<DictionaryIcon />
						</div>
					</div>

					<div className="buttons-container">
						{selectedTab === 1 && (
							<button className="btn actions-btn back-btn" type="button" onClick={() => selectTab(0)}>
								Back
							</button>
						)}

						<Button
							className="actions-btn next-btn"
							primary
							type="submit"
							text={selectedTab === 0 ? "Next" : "Register"}
							disabled={
								selectedTab === 0
									? !formState.dirty || (formState.submitCount > 0 && !formState.isValid)
									: !selectedNativeLanguage || !selectedForeignLanguage
							}
							loading={submitting}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default RegistrationForm;
