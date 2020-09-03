import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { history } from "../..";

import OnboardingForm from "./OnboardingForm";
import { RootStoreContext } from "../../app/stores/rootStore";

const OnboardingPage: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);

	if (!rootStore.userStore.user) {
		history.push("/login");
		return <div />;
	}

	if (!rootStore.commonStore.newUser) {
		history.push("/items-list");
		return <div />;
	}

	document.title = "Before we begin - Log";

	const { onboardingFormSubmit, submitting } = rootStore.userStore;

	return (
		<div id="onboarding-page" {...props}>
			<OnboardingForm onSubmit={onboardingFormSubmit} submitting={submitting} />
		</div>
	);
};

export default observer(OnboardingPage);
