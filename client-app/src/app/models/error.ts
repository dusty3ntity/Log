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
	DictionaryNotFound = 12,
	ItemNotFound = 13,

	DefaultServerError = 51,
	SavingChangesError = 52,

	DefaultValidationError = 101,
	BadId = 102,

	Unauthorized = 191,
	RefreshTokenExpired = 192,
	DefaultErrorsBlockEnd = 199,

	ValidationBlockStart = 400,
	CustomValidationError = 410,
	NoPropsForEditProvided = 411,
	MainDictionaryDeletion = 412,

	ItemOriginalOrTranslationContainEachOther = 421,
	ItemDefinitionContainsOriginalOrTranslation = 422,

	DuplicateDictionaryFound = 431,
	DuplicateItemFound = 432,

	DictionariesLimitReached = 451,
	ItemsLimitReached = 452,
	ValidationBlockEnd = 599,

	CustomNotFoundBlockStart = 600,
	LearningListNotFound = 601,
	LearningItemNotFound = 602,
	LanguageNotFound = 603,
	CustomNotFoundBlockEnd = 699,

	NotEnoughItemsForLearningListGeneration = 701,
	LearningListNotCompleted = 702,
	LearningListCompletedTwoTimes = 703,
	LearningListOutdated = 704,

	DuplicateEmailFound = 901,
	DuplicateUsernameFound = 902,
	Unknown = 9999,
}

export enum NotificationType {
	Info,
	Success,
	Warning,
	Error,
	UnknownError,
}
