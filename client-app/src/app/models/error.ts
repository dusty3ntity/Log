export class CustomError extends Error {
	body: any;
	code: number | undefined;

	constructor(body: any, code?: number) {
		super();
		this.body = body;
		this.code = code;
	}
}

export enum ErrorType {
	DefaultErrorsBlockStart = 0,
	ConnectionRefused = 1,

	DefaultNotFound = 11,

	DefaultServerError = 51,
	SavingChangesError = 52,

	DefaultValidationError = 101,
	BadId = 102,
	DefaultErrorsBlockEnd = 199,

	ValidationBlockStart = 400,
	CustomValidationError = 410,
	NoPropsForEditProvided = 411,

	ItemOriginalOrTranslationContainEachOther = 421,
	ItemDefinitionContainsOriginalOrTranslation = 422,

	DuplicateDictionaryFound = 431,
	DuplicateItemFound = 432,
	ValidationBlockEnd = 599,

	CustomNotFoundBlockStart = 600,
	DictionaryNotFound = 601,
	ItemNotFound = 602,
	LearningListNotFound = 603,
	LearningItemNotFound = 604,
	LanguageNotFound = 605,
	CustomNotFoundBlockEnd = 699,

	NotEnoughItemsForLearningListGeneration = 701,
	LearningListNotCompleted = 702,
	LearningListCompletedTwoTimes = 703,
	LearningListOutdated = 704,

	Unknown = 9999,
}

export enum NotificationType {
	Info,
	Success,
	Warning,
	Error,
	UnknownError,
}
