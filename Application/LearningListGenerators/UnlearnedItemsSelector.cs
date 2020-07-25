using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Application.LearningListGenerators
{
    public static class UnlearnedItemsSelector
    {
        public static List<Item> SelectUnlearnedItems(List<Item> items, int count)
        {
            List<ItemWithPriorityValue> priorityItems = items.Select(GetItemWithPriorityValue).ToList();

            priorityItems = priorityItems.OrderByDescending(i => i.Priority).Take(count).ToList();

            return priorityItems.Select(i => i.Item).ToList();
        }

        private static ItemWithPriorityValue GetItemWithPriorityValue(Item item)
        {
            double complexityIndex = 0;

            if (item.TotalRepeatsCount > 0)
            {
                if (item.CorrectAnswersCount == 0)
                    complexityIndex = item.TotalRepeatsCount > 5 ? 1 : 0.5;
                else
                    complexityIndex = 1 - (double) item.CorrectAnswersCount / item.TotalRepeatsCount;
            }

            int priority = (int) (complexityIndex * 100);

            if (item.GoesForNextDay)
                priority *= 2;

            return new ItemWithPriorityValue
            {
                Item = item,
                Priority = priority
            };
        }

        private class ItemWithPriorityValue
        {
            public Item Item { get; set; }
            public int Priority { get; set; }
        }
    }
}