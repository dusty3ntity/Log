import { ItemType } from "./item";

export enum LearningMode {
	Primary = 110,
	Secondary = 120,
}

export interface ITestItem {
	item: string;
	answerMask: string;
	answerFirstLetter: string;
	definition: string | null;
	type: ItemType;

	isStarred: boolean;
	isLearned: boolean;

	complexity: number;
	correctAnswersToCompletionCount: number;
}

export interface ITestItemAnswer {
	item: string;
	answer: string;
	definition: string | null;
	definitionOrigin: string | null;
	type: ItemType;

	isStarred: boolean;
	isLearned: boolean;
	correctAnswersToCompletionCount: number;
}

export interface ILearningItem {
	id: string;

	learningMode: LearningMode;
	numberInSequence: number;

	item: ITestItem;
}

export interface ILearningItemResult {
	isAnswerCorrect: boolean;
	userAnswer: string;
	numberInSequence: number;

	item: ITestItemAnswer;
}

export interface ILearningList {
	id: string;

	size: number;

	isCompleted: boolean;
	timesCompleted: number;
	correctAnswersToItemCompletion: number;

	completedItemsCount: number;
	correctAnswersCount: number;
}

export interface ILearningItemAnswer {
	learningItemId: string;
	answer: string | null;
}

export enum LearningStatus {
	Initial = 0,

	LearningStart = 1,
	ItemInput = 2,
	ItemResult = 3,
	LearningStartOver = 4,
	LearningEnd = 5,
	LearningOutdated = 6,

	LearningStartItemInput = 12,
	ItemInputItemResult = 23,
	ItemResultItemInput = 32,

	ItemResultLearningStartOver = 34,
	LearningStartOverItemInput = 42,

	ItemResultLearningEnd = 35,

	LearningStartLearningOutdated = 16,
	ItemInputLearningOutdated = 26,
	ItemResultLearningOutdated = 36,
	LearningStartOverLearningOutdated = 46,

	LearningOutdatedItemInput = 62,
}
