namespace Application.Errors
{
    public enum ErrorType
    {
        DefaultErrorsBlockStart = 0,
        ConnectionRefused = 1,

        DefaultNotFound = 11,
        DictionaryNotFound = 12,
        ItemNotFound = 13,

        DefaultServerError = 51,
        SavingChangesError = 52,

        DefaultValidationError = 101,
        BadId = 102,
        DefaultErrorsBlockEnd = 199,

        ValidationBlockStart = 400,
        CustomValidationError = 410,
        NoPropsForEditProvided = 411,
        MainDictionaryDeletion = 412,

        ItemOriginalOrTranslationContainEachOther = 421,
        ItemDefinitionContainsOriginalOrTranslation = 422,

        DuplicateDictionaryFound = 431,
        DuplicateItemFound = 432,
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

        Unknown = 9999,
    }
}