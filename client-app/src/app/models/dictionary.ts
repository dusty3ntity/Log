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

export interface INewDictionary {
	knownLanguageCode: string,
	languageToLearnCode: string,

	preferredLearningListSize: number,
	correctAnswersToItemCompletion: number,

	isMain: boolean,
	isHardModeEnabled: boolean
}

export interface ILanguage {
	id: number;
	name: string;
	isoCode: string;
}
