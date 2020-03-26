using System;
using Domain;

namespace Application.Dictionaries
{
    public class DictionaryDto
    {
        public Guid Id { get; set; }
        public bool IsMain { get; set; }

        public Language KnownLanguage { get; set; }
        public Language LanguageToLearn { get; set; }

        public int WordsCount { get; set; }
        public int PhrasesCount { get; set; }
        public int LearnedItemsCount { get; set; }
        public int PreferredLearningListSize { get; set; }
    }
}