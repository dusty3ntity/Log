import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import OnboardingForm from "./OnboardingForm";
import { RootStoreContext } from "../../app/stores/rootStore";

const OnboardingPage = () => {
	document.title = "Before we begin - Log";

	const rootStore = useContext(RootStoreContext);
	const { onboardingFormSubmit, submitting } = rootStore.userStore;

	return (
		<div id="onboarding-page">
			<OnboardingForm onSubmit={onboardingFormSubmit} submitting={submitting} />
		</div>
	);
};

export default observer(OnboardingPage);
