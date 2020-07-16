import { IItem } from "./item";
export interface IDictionary {
	id: string;
	isMain: boolean;

	knownLanguage: ILanguage;
	languageToLearn: ILanguage;

	wordsCount: number;
	phrasesCount: number;
	learnedWordsCount: number;
	learnedPhrasesCount: number;

	preferredLearningListSize: number;
	correctAnswersToItemCompletion: number;
	isHardModeEnabled: boolean;
}

export interface IExtendedDictionary {
	dictionary: IDictionary;

	itemsRegistry: Map<string, IItem> | undefined;
	activeItem?: IItem;

	queryParams: {
		page: number;
		predicate: Map<string, any>;
		queryResultSize: number;
	};
}

export interface INewDictionary {
	knownLanguageCode: string;
	languageToLearnCode: string;

	preferredLearningListSize: number;
	correctAnswersToItemCompletion: number;

	isMain: boolean;
	isHardModeEnabled: boolean;
}

export interface IEditDictionary {
	preferredLearningListSize: number;
	correctAnswersToItemCompletion: number;

	isHardModeEnabled: boolean;
}

export interface ILanguage {
	id: number;
	name: string;
	isoCode: string;
}
