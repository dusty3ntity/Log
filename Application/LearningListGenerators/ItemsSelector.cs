using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Application.LearningListGenerators
{
    public static class ItemsSelector
    {
        public static List<Item> SelectItems(List<Item> items, int resultSize, int percentageOfLearnedItems)
        {
            List<Item> result;

            var nonStarredItems = new List<Item>();
            var starredItems = SeparateStarredItems(items, nonStarredItems);

            if (starredItems.Count == resultSize)
                return starredItems;

            if (starredItems.Count > resultSize)
            {
                var starredDontGoForNextDayItems = new List<Item>();
                var starredGoForNextDayItems =
                    SeparateStarredGoForNextDayItems(starredItems, starredDontGoForNextDayItems);

                if (starredGoForNextDayItems.Count > resultSize)
                    return SelectRandomItems(starredGoForNextDayItems, resultSize);

                result = starredGoForNextDayItems;

                if (result.Count < resultSize)
                    result.AddRange(SelectRandomItems(starredDontGoForNextDayItems, resultSize - result.Count));

                return result;
            }

            resultSize = resultSize - starredItems.Count;
            int preferredUnlearnedItemsCount = (resultSize * (100 - percentageOfLearnedItems)) / 100;
            int preferredLearnedItemsCount = resultSize - preferredUnlearnedItemsCount;


            var learnedItems = new List<Item>();
            var unlearnedItems = SeparateUnlearnedItems(nonStarredItems, learnedItems);

            if (unlearnedItems.Count < preferredUnlearnedItemsCount)
                preferredLearnedItemsCount += preferredUnlearnedItemsCount - unlearnedItems.Count;
            else if (learnedItems.Count < preferredLearnedItemsCount)
                preferredUnlearnedItemsCount += preferredLearnedItemsCount - learnedItems.Count;

            var selectedUnlearnedItems =
                UnlearnedItemsSelector.SelectUnlearnedItems(unlearnedItems, preferredUnlearnedItemsCount);
            var selectedLearnedItems =
                LearnedItemsSelector.SelectLearnedItems(learnedItems, preferredLearnedItemsCount);

            result = starredItems;
            result.AddRange(selectedUnlearnedItems);
            result.AddRange(selectedLearnedItems);

            return result;
        }

        private static List<Item> SeparateUnlearnedItems(List<Item> items, List<Item> learnedItems)
        {
            var result = new List<Item>();

            foreach (var item in items)
            {
                if (item.IsLearned)
                    learnedItems.Add(item);
                else
                    result.Add(item);
            }

            return result;
        }

        // Should be random, actually
        private static List<Item> SelectRandomItems(List<Item> items, int count)
        {
            var result = items.Where(i => i != null).Take(count).ToList();

            return result;
        }

        private static List<Item> SeparateStarredItems(List<Item> items, List<Item> nonStarredItems)
        {
            var result = new List<Item>();

            foreach (var item in items)
            {
                if (item.IsStarred)
                    result.Add(item);
                else
                    nonStarredItems.Add(item);
            }

            return result;
        }

        private static List<Item> SeparateStarredGoForNextDayItems(List<Item> items,
            List<Item> starredDontGoForNextDayItems)
        {
            var result = new List<Item>();

            foreach (var item in items)
            {
                if (item.GoesForNextDay)
                    result.Add(item);
                else
                    starredDontGoForNextDayItems.Add(item);
            }

            return result;
        }
    }
}