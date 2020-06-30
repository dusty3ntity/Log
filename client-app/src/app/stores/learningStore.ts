import { observable, action, runInAction } from "mobx";

import { ILearningList, ILearningItem, ILearningItemResult, LearningStatus } from "../models/learning";
import { RootStore } from "./rootStore";
import agent from "../api/agent";

export default class LearningStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	animationTimeout = 1000;

	@observable status = LearningStatus.Initial;
	@observable isFlipped = false;

	@observable isLearningStartFlipped = false;
	@observable isItemInputFlipped = false;
	@observable isItemResultFlipped = false;
	@observable isLearningStartOverFlipped = false;
	@observable isLearningEndFlipped = false;
	@observable isLearningOutdatedFlipped = false;

	@observable loadingInitial = false;
	@observable loading = false;
	@observable learningList: ILearningList | null = null;
	@observable learningItem: ILearningItem | null | undefined = undefined;
	@observable learningItemResult: ILearningItemResult | undefined = undefined;

	@action onInitialLoad = async () => {
		this.loadingInitial = true;
		await this.loadLearningList();
		runInAction("loading learning list and setting the card", () => {
			if (!this.learningList) {
				console.log("no connection");
			}
			else if (!this.learningList.isCompleted) {
				this.status = LearningStatus.LearningStart;
			} else if (this.learningList.timesCompleted === 1) {
				this.status = LearningStatus.LearningStartOver;
			} else if (this.learningList.timesCompleted === 2) {
				this.status = LearningStatus.LearningEnd;
			}
			this.loadingInitial = false;
		});
	};

	@action onStart = async () => {
		await this.loadLearningItem();
		runInAction("loading learning item and flipping the card", () => {
			if (this.learningItem) {
				this.isItemInputFlipped = !this.isLearningStartFlipped;
				this.status = LearningStatus.LearningStartItemInput;
			} else {
				this.isLearningOutdatedFlipped = !this.isLearningStartFlipped;
				this.status = LearningStatus.LearningStartLearningOutdated;
			}
			this.isFlipped = !this.isFlipped;
			setTimeout(() => {
				if (this.learningItem) {
					this.status = LearningStatus.ItemInput;
				} else {
					this.status = LearningStatus.LearningOutdated;
				}
			}, this.animationTimeout);
		});
	};

	@action onItemSubmit = async (answer: string) => {
		await this.checkAnswer(answer);
		runInAction("checking learning item and flipping the card", () => {
			if (this.learningItemResult) {
				this.isItemResultFlipped = !this.isItemInputFlipped;
				this.status = LearningStatus.ItemInputItemResult;
			} else {
				this.isLearningOutdatedFlipped = !this.isItemInputFlipped;
				this.status = LearningStatus.ItemInputLearningOutdated;
			}
			this.isFlipped = !this.isFlipped;
			setTimeout(() => {
				if (this.learningItemResult) {
					this.status = LearningStatus.ItemResult;
				} else {
					this.status = LearningStatus.LearningOutdated;
				}
			}, this.animationTimeout);
		});
	};

	@action onNextItem = async () => {
		await this.loadLearningItem();
		runInAction("loading next learning item and flipping the card", () => {
			if (this.learningItem) {
				this.isItemInputFlipped = !this.isItemResultFlipped;
				this.status = LearningStatus.ItemResultItemInput;
			} else if (this.learningItem === null && this.learningList!.timesCompleted === 1) {
				this.isLearningStartOverFlipped = !this.isItemResultFlipped;
				this.status = LearningStatus.ItemResultLearningStartOver;
			} else if (this.learningItem === null && this.learningList!.timesCompleted === 2) {
				this.isLearningEndFlipped = !this.isItemResultFlipped;
				this.status = LearningStatus.ItemResultLearningEnd;
			} else {
				this.isLearningOutdatedFlipped = !this.isItemResultFlipped;
				this.status = LearningStatus.ItemResultLearningOutdated;
			}
			this.isFlipped = !this.isFlipped;
			setTimeout(() => {
				if (this.learningItem) {
					// this.status = LearningStatus.ItemInput;
				} else if (this.learningItem === null && this.learningList!.timesCompleted === 1) {
					this.status = LearningStatus.LearningStartOver;
				} else if (this.learningItem === null && this.learningList!.timesCompleted === 2) {
					this.status = LearningStatus.LearningEnd;
				} else {
					this.status = LearningStatus.LearningOutdated;
				}
			}, this.animationTimeout);
		});
	};

	@action onStartOver = async () => {
		await this.startOver();
		runInAction("loading learning item and flipping the card (start over)", () => {
			if (this.learningItem) {
				this.isItemInputFlipped = !this.isLearningStartOverFlipped;
				this.status = LearningStatus.LearningStartOverItemInput;
			} else {
				this.isLearningOutdatedFlipped = !this.isLearningStartOverFlipped;
				this.status = LearningStatus.LearningStartOverLearningOutdated;
			}
			this.isFlipped = !this.isFlipped;
			setTimeout(() => {
				if (this.learningItem) {
					this.status = LearningStatus.ItemInput;
				} else {
					this.status = LearningStatus.LearningOutdated;
				}
			}, this.animationTimeout);
		});
	};

	@action onOutdatedStart = async () => {
		await this.loadLearningList();
		await this.loadLearningItem();
		runInAction("loading learning item and flipping the card", () => {
			this.isItemInputFlipped = !this.isLearningOutdatedFlipped;
			this.status = LearningStatus.LearningOutdatedItemInput;
			this.isFlipped = !this.isFlipped;
			setTimeout(() => {
				this.status = LearningStatus.ItemInput;
			}, this.animationTimeout);
		});
	};

	@action loadLearningList = async () => {
		this.loading = true;
		try {
			const learningList = await agent.LearningLists.get();
			runInAction("loading learning list", () => {
				this.learningList = learningList;
			});
		} catch (err) {
			console.log(err);
		} finally {
			runInAction("loading learning list", () => {
				this.loading = false;
			});
		}
	};

	@action loadLearningItem = async () => {
		this.loading = true;
		try {
			let learningItem = await agent.LearningLists.getNextItem(this.learningList!.id);
			runInAction("loading learning item", () => {
				if (typeof learningItem === "string") {
					this.learningList!.isCompleted = true;
					this.learningList!.timesCompleted++;
					this.learningItem = null;
				} else {
					this.learningItem = learningItem;
				}
			});
		} catch (err) {
			console.log(err);
			this.learningItem = undefined;
		} finally {
			runInAction("loading learning item", () => {
				this.loading = false;
			});
		}
	};

	@action checkAnswer = async (answer: string) => {
		this.loading = true;
		try {
			const learningItemAnswer = {
				learningItemId: this.learningItem!.id,
				answer: answer,
			};
			const learningItemResult: ILearningItemResult = await agent.LearningLists.checkItem(
				this.learningList!.id,
				learningItemAnswer
			);
			runInAction("checking learning item", () => {
				this.learningItemResult = learningItemResult;
				this.learningList!.completedItemsCount++;
				if (learningItemResult.isAnswerCorrect) this.learningList!.correctAnswersCount++;
			});
		} catch (err) {
			console.log(err);
			this.learningItemResult = undefined;
		} finally {
			runInAction("checking learning item", () => {
				this.loading = false;
			});
		}
	};

	@action startOver = async () => {
		this.loading = true;
		try {
			await agent.LearningLists.startOver(this.learningList!.id);
			await this.loadLearningItem();
		} catch (err) {
			console.log(err);
			this.learningItem = undefined;
		} finally {
			runInAction("starting over", () => {
				this.loading = false;
			});
		}
	};
}
