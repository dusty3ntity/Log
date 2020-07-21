import { observable, action, runInAction } from "mobx";

import { ILearningList, ILearningItem, ILearningItemResult, LearningStatus } from "../models/learning";
import { RootStore } from "./rootStore";
import agent from "../api/agent";
import { ErrorType, NotificationType } from "../models/error";
import { createNotification } from "./../common/util/notifications";

export default class LearningStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	animationTimeout = 1000;

	@observable status = LearningStatus.Initial;
	@observable flipCounter = 0;

	@observable isLearningStartFlipped = false;
	@observable isItemInputFlipped = false;
	@observable isItemResultFlipped = false;
	@observable isLearningStartOverFlipped = false;
	@observable isLearningEndFlipped = false;
	@observable isLearningOutdatedFlipped = false;

	@observable loading = false;
	@observable learningList: ILearningList | undefined;
	@observable learningItem: ILearningItem | undefined;
	@observable learningItemResult: ILearningItemResult | undefined;

	@action reset = () => {
		this.status = LearningStatus.Initial;
		this.flipCounter = 0;
		this.isLearningStartFlipped = false;
		this.isItemInputFlipped = false;
		this.isItemResultFlipped = false;
		this.isLearningStartOverFlipped = false;
		this.isLearningEndFlipped = false;
		this.isLearningOutdatedFlipped = false;
	};

	@action onInitialLoad = async () => {
		this.reset();
		try {
			await this.loadLearningList();
			runInAction("onInitialLoad", () => {
				if (!this.learningList!.isCompleted) {
					this.status = LearningStatus.LearningStart;
				} else if (this.learningList!.timesCompleted === 1) {
					this.status = LearningStatus.LearningStartOver;
				} else if (this.learningList!.timesCompleted === 2) {
					this.status = LearningStatus.LearningEnd;
				}
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.code === ErrorType.NotEnoughItemsForLearningListGeneration) {
				runInAction("onInitialLoad", () => (this.status = LearningStatus.NotEnoughItems));
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[learningStore]@onInitialLoad",
				});
			}
		}
	};

	@action onStart = async () => {
		let nextStatus: LearningStatus | undefined;
		try {
			await this.loadLearningItem();
			runInAction("onStart", () => {
				if (this.learningItem) {
					this.isItemInputFlipped = !this.isLearningStartFlipped;
					this.status = LearningStatus.LearningStartItemInput;
					nextStatus = LearningStatus.ItemInput;
				} else {
					createNotification(NotificationType.Error, {
						message: "Synchronization error! Please, reload the page.",
					});
				}
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.code === ErrorType.LearningListOutdated) {
				runInAction("onStart", () => {
					this.isLearningOutdatedFlipped = !this.isLearningStartFlipped;
					this.status = LearningStatus.LearningStartLearningOutdated;
					nextStatus = LearningStatus.LearningOutdated;
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[learningStore]@onStart",
				});
			}
		} finally {
			if (!nextStatus) {
				return;
			}
			runInAction("onStart", () => {
				this.flipCounter -= 0.5;
				setTimeout(() => {
					runInAction("onStart", () => (this.status = nextStatus!));
				}, this.animationTimeout + 30); // fucking firefox
			});
		}
	};

	@action onItemSubmit = async (answer: string) => {
		let nextStatus: LearningStatus | undefined;
		try {
			await this.checkAnswer(answer);
			runInAction("onItemSubmit", () => {
				this.isItemResultFlipped = !this.isItemInputFlipped;
				this.status = LearningStatus.ItemInputItemResult;
				nextStatus = LearningStatus.ItemResult;
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.code === ErrorType.LearningListOutdated) {
				runInAction("onItemSubmit", () => {
					this.isLearningOutdatedFlipped = !this.isItemInputFlipped;
					this.status = LearningStatus.ItemInputLearningOutdated;
					nextStatus = LearningStatus.LearningOutdated;
				});
			} else if (err.code === ErrorType.LearningItemNotFound) {
				createNotification(NotificationType.Error, {
					message: "Item not found! Please, reload the page or contact the administrator.",
					error: err.body,
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[learningStore]@onItemSubmit",
				});
			}
		} finally {
			if (!nextStatus) {
				return;
			}
			runInAction("onItemSubmit", () => {
				this.flipCounter -= 0.5;
				setTimeout(() => {
					runInAction("onItemSubmit", () => (this.status = nextStatus!));
				}, this.animationTimeout);
			});
		}
	};

	@action onNextItem = async () => {
		let nextStatus: LearningStatus | undefined;
		try {
			await this.loadLearningItem();
			runInAction("onNextItem", () => {
				if (this.learningItem) {
					this.isItemInputFlipped = !this.isItemResultFlipped;
					this.status = LearningStatus.ItemResultItemInput;
					nextStatus = LearningStatus.ItemInput;
				} else if (this.learningList!.timesCompleted === 1) {
					this.isLearningStartOverFlipped = !this.isItemResultFlipped;
					this.status = LearningStatus.ItemResultLearningStartOver;
					nextStatus = LearningStatus.LearningStartOver;
				} else if (this.learningList!.timesCompleted === 2) {
					this.isLearningEndFlipped = !this.isItemResultFlipped;
					this.status = LearningStatus.ItemResultLearningEnd;
					nextStatus = LearningStatus.LearningEnd;
				}
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.code === ErrorType.LearningListOutdated) {
				runInAction("onNextItem", () => {
					this.isLearningOutdatedFlipped = !this.isItemResultFlipped;
					this.status = LearningStatus.ItemResultLearningOutdated;
					nextStatus = LearningStatus.LearningOutdated;
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[learningStore]@onNextItem",
				});
			}
		} finally {
			if (!nextStatus) {
				return;
			}
			runInAction("onNextItem", () => {
				this.flipCounter -= 0.5;
				setTimeout(() => {
					runInAction("onNextItem", () => (this.status = nextStatus!));
				}, this.animationTimeout);
			});
		}
	};

	@action onStartOver = async () => {
		let nextStatus: LearningStatus | undefined;
		try {
			await this.startOver();
			runInAction("onStartOver", () => {
				if (this.learningItem) {
					this.isItemInputFlipped = !this.isLearningStartOverFlipped;
					this.status = LearningStatus.LearningStartOverItemInput;
					nextStatus = LearningStatus.ItemInput;
				} else {
					createNotification(NotificationType.Error, {
						message: "Synchronization error! Please, reload the page.",
					});
				}
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.code === ErrorType.LearningListOutdated) {
				runInAction("onStartOver", () => {
					this.isLearningOutdatedFlipped = !this.isLearningStartOverFlipped;
					this.status = LearningStatus.LearningStartOverLearningOutdated;
					nextStatus = LearningStatus.LearningOutdated;
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[learningStore]@onStartOver",
				});
			}
		} finally {
			if (!nextStatus) {
				return;
			}
			runInAction("onStartOver", () => {
				this.flipCounter -= 0.5;
				setTimeout(() => runInAction("onStartOver", () => (this.status = nextStatus!)), this.animationTimeout);
			});
		}
	};

	@action onOutdatedStart = async () => {
		let nextStatus: LearningStatus | undefined;
		try {
			await this.loadLearningList();
			await this.loadLearningItem();
			runInAction("onOutdatedStart", () => {
				if (this.learningItem) {
					this.isItemInputFlipped = !this.isLearningOutdatedFlipped;
					this.status = LearningStatus.LearningOutdatedItemInput;
					nextStatus = LearningStatus.ItemInput;
				} else {
					createNotification(NotificationType.Error, {
						message: "Synchronization error! Please, reload the page.",
					});
				}
			});
		} catch (err) {
			if (err.code < ErrorType.DefaultErrorsBlockEnd) {
				return;
			}

			if (err.code === ErrorType.LearningListOutdated) {
				createNotification(NotificationType.Error, {
					message: "Training is outdated again! Press the button one more time or reload the page.",
					error: err.body,
				});
			} else {
				createNotification(NotificationType.UnknownError, {
					error: err.body,
					errorOrigin: "[learningStore]@onOutdatedStart",
				});
			}
		} finally {
			if (!nextStatus) {
				return;
			}
			runInAction("onOutdatedStart", () => {
				this.flipCounter -= 0.5;
				setTimeout(() => {
					runInAction("onOutdatedStart", () => (this.status = nextStatus!));
				}, this.animationTimeout);
			});
		}
	};

	@action loadLearningList = async () => {
		this.loading = true;
		try {
			const learningList = await agent.LearningLists.get(this.rootStore.dictionaryStore.activeDictionaryId!);
			runInAction("loading learning list", () => {
				this.learningList = learningList;
			});
		} catch (err) {
			runInAction("loading learning list", () => {
				this.learningList = undefined;
			});
			throw err;
		} finally {
			runInAction("loading learning list", () => {
				this.loading = false;
			});
		}
	};

	@action loadLearningItem = async () => {
		this.loading = true;
		try {
			let learningItem = await agent.LearningLists.getNextItem(
				this.rootStore.dictionaryStore.activeDictionaryId!,
				this.learningList!.id
			);
			runInAction("loading learning item", () => {
				if (typeof learningItem === "string") {
					this.learningList!.isCompleted = true;
					this.learningList!.timesCompleted++;
					this.learningItem = undefined;
				} else {
					this.learningItem = learningItem;
				}
			});
		} catch (err) {
			runInAction("loading learning item", () => (this.learningItem = undefined));
			throw err;
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
			const learningItemResult = await agent.LearningLists.checkItem(
				this.rootStore.dictionaryStore.activeDictionaryId!,
				this.learningList!.id,
				learningItemAnswer
			);
			runInAction("checking learning item", () => {
				this.learningItemResult = learningItemResult;
				this.learningList!.totalCompletedItemsCount++;
				this.learningList!.completedItemsCount++;

				const newItem = learningItemResult.item;
				const item = this.rootStore.itemStore.itemRegistry.get(newItem.id);

				if (item) {
					item.isStarred = newItem.isStarred;
					item.isLearned = newItem.isLearned;
					item.correctAnswersToCompletionCount = newItem.correctAnswersToCompletionCount;
					item.totalRepeatsCount++;
				}

				if (learningItemResult.isAnswerCorrect) {
					this.learningList!.correctAnswersCount++;
					if (item) {
						item.correctAnswersCount++;
					}
				}
			});
		} catch (err) {
			runInAction("checking learning item", () => (this.learningItemResult = undefined));
			throw err;
		} finally {
			runInAction("checking learning item", () => {
				this.loading = false;
			});
		}
	};

	@action startOver = async () => {
		this.loading = true;
		try {
			await agent.LearningLists.startOver(
				this.rootStore.dictionaryStore.activeDictionaryId!,
				this.learningList!.id
			);
			await this.loadLearningItem();
			runInAction("starting over", () => {
				this.learningList!.isCompleted = false;
			});
		} catch (err) {
			runInAction("starting over", () => (this.learningItem = undefined));
			throw err;
		} finally {
			runInAction("starting over", () => {
				this.loading = false;
			});
		}
	};
}
