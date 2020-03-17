using System;
using System.Collections.Generic;

namespace Domain
{
    public class Dictionary
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsMain { get; set; }

        public virtual Language KnownLanguage { get; set; }
        public virtual Language LanguageToLearn { get; set; }

        public int WordsCount { get; set; }
        public int PhrasesCount { get; set; }
        public int LearnedItemsCount { get; set; }
        public int PreferredLearningListSize { get; set; }

        public virtual ICollection<Item> Items { get; set; }
        public virtual LearningList LearningList { get; set; }
    }
}