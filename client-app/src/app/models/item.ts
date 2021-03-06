export enum ItemType {
	Word = 10,
	Phrase = 20,
}

export interface IItemsEnvelope {
	items: IItem[];
	queryResultSize: number;
}

export interface IItem {
	id: string;

	original: string;
	translation: string;
	definition: string | null;
	definitionOrigin: string | null;
	type: ItemType;
	creationDate: Date;

	isStarred: boolean;
	isLearned: boolean;

	totalRepeatsCount: number;
	correctAnswersCount: number;
	correctAnswersToCompletionCount: number;
}

export interface IEditItem {
	original: string;
	translation: string;
	definition: string | null;
	definitionOrigin: string | null;
}

export interface INewItem {
	original: string;
	translation: string;
	definition: string | null;
	definitionOrigin: string | null;
	type: ItemType;

	isStarred: boolean;
}
