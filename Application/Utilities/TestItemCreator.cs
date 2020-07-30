using System;
using System.Text;
using Application.LearningItems;
using Domain;

namespace Application.Utilities
{
    public static class TestItemCreator
    {
        public static TestItem Create(LearningItem learningItem)
        {
            var item = learningItem.Item;

            double complexity = 0;
            if (item.TotalRepeatsCount > 0)
            {
                if (item.CorrectAnswersCount == 0)
                    complexity = 1;
                else if (item.CorrectAnswersCount == item.TotalRepeatsCount)
                    complexity = 0.1;
                else
                    complexity = Math.Round(1 - (double) item.CorrectAnswersCount / item.TotalRepeatsCount, 2);
            }

            var testItem = new TestItem
            {
                Item = learningItem.LearningMode == LearningMode.Primary
                    ? item.Translation
                    : item.Original,
                AnswerMask = learningItem.LearningMode == LearningMode.Primary
                    ? GenerateMask(item.Original)
                    : GenerateMask(item.Translation),
                AnswerFirstLetter = learningItem.LearningMode == LearningMode.Primary
                    ? item.Original[0]
                    : item.Translation[0],
                Definition = item.Definition,
                Type = item.Type,

                IsStarred = item.IsStarred,
                IsLearned = item.IsLearned,

                Complexity = complexity,
                CorrectAnswersToCompletionCount = item.CorrectAnswersToCompletionCount
            };

            return testItem;
        }

        private static string GenerateMask(string item)
        {
            StringBuilder result = new StringBuilder().Append(item[0]);

            for (int i = 1; i < item.Length; i++)
            {
                if (item[i] == ' ')
                    result.Append(' ');
                else
                    result.Append('_');
            }

            return result.ToString();
        }
    }
}