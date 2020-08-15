import { ITourStep } from "./../models/tour";
import { observable, action } from "mobx";

import { RootStore } from "./rootStore";
import agent from "../api/agent";

export default class TourStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable currentState = {
		run: false,
		continuous: true,
		loading: false,
		stepIndex: 0,
	};

	@observable steps: ITourStep[] | undefined;

	@observable finishCurrentTourPart: (() => void) | undefined;

	@action startTour = (steps: ITourStep[], finishTourPart: () => void) => {
		this.currentState.run = false;
		this.finishCurrentTourPart = finishTourPart;
		this.currentState.stepIndex = 0;
		this.steps = steps;
		this.currentState.run = true;
	};

	@action stopTour = () => {
		this.currentState.run = false;
	};

	@action goToNextStep = () => {
		this.currentState.stepIndex++;
	};

	@action goToPreviousStep = () => {
		this.currentState.stepIndex--;
	};

	@action setStep = (step: number) => {
		this.currentState.stepIndex = step;
	};

	@action skipTour = async () => {
		this.rootStore.userStore.user!.tourCompleted = true;
		this.rootStore.userStore.user!.itemsTourCompleted = true;
		this.rootStore.userStore.user!.newItemTourCompleted = true;
		this.rootStore.userStore.user!.learningTourCompleted = true;
		await agent.Users.completeTour({ tourCompleted: true });
	};

	@action finishItemsTourPart = async () => {
		if (this.rootStore.userStore.user!.itemsTourCompleted) {
			return;
		}
		this.rootStore.userStore.user!.itemsTourCompleted = true;
		await agent.Users.completeTour({ itemsTourCompleted: true });
	};

	@action finishNewItemTourPart = async () => {
		if (this.rootStore.userStore.user!.newItemTourCompleted) {
			return;
		}
		this.rootStore.userStore.user!.newItemTourCompleted = true;
		await agent.Users.completeTour({ newItemTourCompleted: true });
	};

	@action finishLearningTourPart = async () => {
		if (this.rootStore.userStore.user!.learningTourCompleted) {
			return;
		}
		this.rootStore.userStore.user!.learningTourCompleted = true;
		this.rootStore.userStore.user!.tourCompleted = true;
		await agent.Users.completeTour({ learningTourCompleted: true, tourCompleted: true });
	};

	@action setFinishCurrentTourPart = (func: () => void) => {
		this.finishCurrentTourPart = func;
	};
}
