using System;

namespace Application.LearningLists
{
    public class LearningListDto
    {
        public Guid Id { get; set; }

        public int Size { get; set; }

        public bool IsCompleted { get; set; }
        public int TimesCompleted { get; set; }
        public int CorrectAnswersToItemCompletion { get; set; }
        public bool IsHardModeEnabled { get; set; }

        public int CompletedItemsCount { get; set; }
        public int CorrectAnswersCount { get; set; }
        public int TotalCompletedItemsCount { get; set; }
    }
}