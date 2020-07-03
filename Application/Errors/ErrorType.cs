namespace Application.Errors
{
    public enum ErrorType
    {
        DefaultErrorsBlockStart = 0,
        ConnectionRefused = 1,

        DefaultNotFound = 11,

        DefaultServerError = 51,
        SavingChangesError = 52,

        DefaultValidationError = 101,
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
}