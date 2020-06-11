export interface IItem {
	id: string;
	original: string;
	translation: string;
	definition: string | null;
	definitionOrigin: string | null;
	type: number;
	creationDate: Date;
	isStarred: boolean;
	isLearned: boolean;
	totalRepeatsCount: number;
	correctRepeatsCount: number;
}

export interface IEditItem {
	original: string | undefined;
	translation: string | undefined;
	definition: string | undefined;
	definitionOrigin: string | undefined;
}

export interface INewItem {
	original: string;
	translation: string;
	definition: string | null;
	definitionOrigin: string | null;
	type: number;
	isStarred: boolean;
}