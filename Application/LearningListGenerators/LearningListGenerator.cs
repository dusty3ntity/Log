using System;
using System.Collections.Generic;
using Domain;

namespace Application.LearningListGenerators
{
    public static class LearningListGenerator
    {
        private const double SecondaryLearningModeProbability = 0.3;
        private static readonly Random Rand = new Random();

        public static List<LearningItem> Generate(List<Item> items, int preferredSize)
        {
            List<Item> selectedItems;

            if (items.Count <= preferredSize)
                selectedItems = items;
            else
                selectedItems = ItemsSelector.SelectItems(items, preferredSize, 40);

            LearningListShuffler.Shuffle(selectedItems);

            var list = ConvertItemsToLearningItems(selectedItems, SecondaryLearningModeProbability);

            return list;
        }

        private static List<LearningItem> ConvertItemsToLearningItems(List<Item> items, double secondaryModeProbability)
        {
            var result = new List<LearningItem>();

            for (int i = 0; i < items.Count; i++)
            {
                var learningItem = new LearningItem
                {
                    Item = items[i],
                    LearningMode = Rand.NextDouble() >= secondaryModeProbability
                        ? LearningMode.Primary
                        : LearningMode.Secondary,
                    NumberInSequence = i,
                };

                result.Add(learningItem);
            }

            return result;
        }
    }
}