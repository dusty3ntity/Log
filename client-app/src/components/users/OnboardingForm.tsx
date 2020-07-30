import React, { useState } from "react";

import { ILanguage } from "../../app/models/languages";
import { IOnboardingFormData } from "../../app/models/user";
import LanguagesList from "../dictionaries/LanguagesList";
import Divider from "../common/other/Divider";
import Button from "../common/inputs/Button";

interface IProps {
	onSubmit: (formData: IOnboardingFormData) => void;
	submitting: boolean;
}

const OnboardingForm: React.FC<IProps> = ({ onSubmit, submitting }) => {
	const [selectedNativeLanguage, selectNativeLanguage] = useState<ILanguage | undefined>(undefined);
	const [selectedForeignLanguage, selectForeignLanguage] = useState<ILanguage | undefined>(undefined);

	return (
		<div id="onboarding-form" className="user-form">
			<div className="title row">Before we begin</div>

			<Divider />

			<div className="tab-prompt">
				Select your native language and the language you want to learn, and we will create a personal dictionary
				for you!
			</div>

			<div id="languages-tab" className="tab row">
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

			<Divider invisible />

			<div className="actions-container row">
				<Button
					className="actions-btn submit-btn"
					primary
					onClick={() =>
						onSubmit({ nativeLanguage: selectedNativeLanguage!, foreignLanguage: selectedForeignLanguage! })
					}
					text="Submit"
					disabled={!selectedNativeLanguage || !selectedForeignLanguage}
					loading={submitting}
				/>
			</div>
		</div>
	);
};

export default OnboardingForm;
