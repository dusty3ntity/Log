using System;

namespace Domain
{
    public class LearningItem
    {
        public Guid Id { get; set; }
        public LearningMode LearningMode { get; set; }
        public int NumberInSequence { get; set; }
        public virtual Item Item { get; set; }
    }
}