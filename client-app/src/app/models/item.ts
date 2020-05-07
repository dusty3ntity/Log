export interface IItem {
	id: string;
	original: string;
	translation: string;
	description?: string | null;
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
	description: string | undefined;
}