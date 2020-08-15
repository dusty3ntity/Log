import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

import { RootStoreContext } from "../../../app/stores/rootStore";

const OnboardingTour = () => {
	const rootStore = useContext(RootStoreContext);
	const { setStep, currentState, stopTour, steps, skipTour, finishCurrentTourPart } = rootStore.tourStore;

	const callback = (data: any) => {
		const { action, index, type, status } = data;

		if (action === ACTIONS.CLOSE || (status === STATUS.SKIPPED && currentState.run)) {
			stopTour();
			skipTour();
		} else if (status === STATUS.FINISHED) {
			stopTour();
			finishCurrentTourPart!();
		} else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
			if (action === ACTIONS.NEXT) {
				setStep(index + 1);
			} else {
				setStep(index - 1);
			}
		}
	};

	return (
		<Joyride
			{...currentState}
			showSkipButton
			disableOverlay
			locale={{ skip: "Skip all", last: "Finish" }}
			steps={steps!}
			callback={callback}
		/>
	);
};

export default observer(OnboardingTour);
