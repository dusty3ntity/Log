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
            var testItem = new TestItem
            {
                Item = learningItem.LearningMode == LearningMode.Primary
                    ? item.Translation
                    : item.Original,
                ItemType = item.Type,
                Definition = item.Definition,
                DefinitionOrigin = item.DefinitionOrigin,
                AnswerMask = learningItem.LearningMode == LearningMode.Primary
                    ? GenerateMask(item.Original)
                    : GenerateMask(item.Translation),
                AnswerFirstLetter = learningItem.LearningMode == LearningMode.Primary
                    ? item.Original[0]
                    : item.Translation[0],
                IsStarred = item.IsStarred,
                CorrectRepeatsCount = item.CorrectAnswersCount
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