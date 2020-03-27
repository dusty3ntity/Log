using System;
using System.Collections.Generic;

namespace Domain
{
    public class LearningList
    {
        public Guid Id { get; set; }

        public Guid DictionaryId { get; set; }
        public Dictionary Dictionary { get; set; }

        public DateTime CreationDate { get; set; }
        public int Size { get; set; }
        public bool IsCompleted { get; set; }
        public int CompletedItemsCount { get; set; }

        public ICollection<LearningItem> LearningItems { get; set; }
    }
}