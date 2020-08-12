using System;
using Domain;

namespace Application.Utilities
{
    public static class ItemAnswerProcessor
    {
        public static void ProcessItemAnswer(Dictionary dictionary, LearningList list, LearningItem learningItem,
            bool isAnswerCorrect)
        {
            var item = learningItem.Item;
            item.TotalRepeatsCount++;

            if (isAnswerCorrect)
            {
                item.CorrectAnswersCount++;

                if (item.IsLearned)
                {
                    item.LastLearnedRepeatDate = DateTime.Now;
                    item.LearnedRepeatsCount++;
                    return;
                }

                if (item.CorrectAnswersToCompletionCount != list.CorrectAnswersToItemCompletion &&
                    list.TimesCompleted != 1)
                    item.CorrectAnswersToCompletionCount++;

                if (item.CorrectAnswersToCompletionCount == list.CorrectAnswersToItemCompletion)
                {
                    if (item.IsStarred)
                        dictionary.StarredItemsCount--;
                    item.IsLearned = true;
                    item.IsStarred = false;
                    item.GoesForNextDay = false;

                    item.LastLearnedRepeatDate = DateTime.Now;
                    item.LearnedRepeatsCount++;

                    if (item.Type == ItemType.Word)
                        dictionary.LearnedWordsCount++;
                    else
                        dictionary.LearnedPhrasesCount++;
                }
            }
            else
            {
                item.GoesForNextDay = true;
                item.IsLearned = false;

                item.LastLearnedRepeatDate = null;
                item.LearnedRepeatsCount = 0;
                
                if (list.IsHardModeEnabled)
                    item.CorrectAnswersToCompletionCount = 0;
                else
                    item.CorrectAnswersToCompletionCount--;
            }
        }
    }
}