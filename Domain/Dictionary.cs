using System;
using System.Collections.Generic;

namespace Domain
{
    public class Dictionary
    {
        public Guid Id { get; set; }
        public bool IsMain { get; set; }

        public int KnownLanguageId { get; set; }
        public Language KnownLanguage { get; set; }

        public int LanguageToLearnId { get; set; }
        public Language LanguageToLearn { get; set; }

        public int WordsCount { get; set; }
        public int PhrasesCount { get; set; }
        public int LearnedItemsCount { get; set; }
        
        public int PreferredLearningListSize { get; set; }
        public int CorrectAnswersToItemCompletion { get; set; }

        public ICollection<Item> Items { get; set; }

        public Guid? LearningListId { get; set; }
        public LearningList LearningList { get; set; }
    }
}