export interface IItem {
	id: string;
	original: string;
	translation: string;
	description?: string | undefined;
	type?: number | undefined;
	creationDate?: Date | undefined;
	isStarred?: boolean | undefined;
	isLearned: boolean;
	totalRepeatsCount: number;
	correctRepeatsCount?: number | undefined;
}