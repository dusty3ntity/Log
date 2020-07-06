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
	isHardModeEnabled: number;
}

export interface ILanguage {
	id: number;
	name: string;
	isoCode: string;
}
