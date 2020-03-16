using System;

namespace Domain
{
    public class Item
    {
        public Guid Id { get; set; }
        public string Original { get; set; }
        public string Translation { get; set; }
        public ItemType ItemType { get; set; }

        public bool IsStarred { get; set; }
        public bool IsLearned { get; set; }
        public int TotalRepeatsCount { get; set; }
        public int CorrectRepeatsCount { get; set; }
        public DateTime CreationDate { get; set; }
        public bool GoesForNextDay { get; set; }
    }
}