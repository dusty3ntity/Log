using System;

namespace Domain
{
    public class LearningItem
    {
        public Guid Id { get; set; }

        public Guid LearningListId { get; set; }
        public LearningList LearningList { get; set; }

        public LearningMode LearningMode { get; set; }
        public int NumberInSequence { get; set; }

        public Guid? ItemId { get; set; }
        public Item Item { get; set; }
    }
}