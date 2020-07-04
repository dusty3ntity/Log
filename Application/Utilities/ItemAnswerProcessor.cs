using Domain;

namespace Application.Utilities
{
    public static class ItemAnswerProcessor
    {
        public static void ProcessItemAnswer(LearningList list, LearningItem learningItem, bool isAnswerCorrect)
        {
            var item = learningItem.Item;
            item.TotalRepeatsCount++;

            if (isAnswerCorrect)
            {
                item.CorrectAnswersCount++;

                if (item.IsLearned)
                    return;

                if (!item.IsStarred)
                    item.GoesForNextDay = false;

                if (item.CorrectAnswersToCompletionCount != list.CorrectAnswersToItemCompletion &&
                    list.TimesCompleted != 1)
                    item.CorrectAnswersToCompletionCount++;

                if (item.CorrectAnswersToCompletionCount == list.CorrectAnswersToItemCompletion)
                {
                    item.IsLearned = true;
                    item.IsStarred = false;
                }
            }
            else
            {
                item.GoesForNextDay = true;
                item.IsLearned = false;
                if (list.IsHardModeEnabled)
                    item.CorrectAnswersToCompletionCount = 0;
                else
                    item.CorrectAnswersToCompletionCount--;
            }
        }
    }
}