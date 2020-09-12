import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { history } from "../..";

import OnboardingForm from "./OnboardingForm";
import { RootStoreContext } from "../../app/stores/rootStore";

const OnboardingPage: React.FC = ({ ...props }) => {
	const rootStore = useContext(RootStoreContext);
	const { onboardingFormSubmit, submitting } = rootStore.userStore;

	useEffect(() => {
		document.title = "Before we begin - Log";
	}, []);

	if (!rootStore.userStore.user) {
		history.push("/login");
		return null;
	}

	if (!rootStore.commonStore.newUser) {
		history.push("/items-list");
		return null;
	}

	return (
		<div id="onboarding-page" {...props}>
			<OnboardingForm onSubmit={onboardingFormSubmit} submitting={submitting} />
		</div>
	);
};

export default observer(OnboardingPage);
