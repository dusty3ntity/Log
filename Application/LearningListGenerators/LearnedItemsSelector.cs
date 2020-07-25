using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Application.LearningListGenerators
{
    public static class LearnedItemsSelector
    {
        private const int FirstRepeatBasePriority = 100000;
        private const int FirstRepeatSpanDays = 1;
        private const int FirstRepeatSpanPriorityAddition = 50000;
        private const int FirstRepeatSpanPriorityNegativeAddition = -25000;

        private const int SecondRepeatBasePriority = 10000;
        private const int SecondRepeatSpanDays = 5;
        private const int SecondRepeatSpanPriorityAddition = 8000;
        private const int SecondRepeatSpanPriorityNegativeAddition = -4000;

        private const int ThirdRepeatBasePriority = 100;
        private const int ThirdRepeatSpanDays = 14;
        private const int ThirdRepeatSpanPriorityAddition = 60;
        private const int ThirdRepeatSpanPriorityNegativeAddition = -30;

        private const int FourToFiveRepeatsBasePriority = 20;
        private const int FourToFiveRepeatsSpanDays = 30;
        private const int FourToFiveRepeatsSpanPriorityAddition = 10;
        private const int FourToFiveRepeatsSpanPriorityNegativeAddition = -5;

        private const int SixToTenRepeatsBasePriority = 10;
        private const int SixToTenRepeatsSpanDays = 45;
        private const int SixToTenRepeatsSpanPriorityAddition = 2;
        private const int SixToTenRepeatsSpanPriorityNegativeAddition = -1;

        public static List<Item> SelectLearnedItems(List<Item> items, int count)
        {
            List<ItemWithPriorityValue> priorityItems = items.Select(GetItemWithPriorityValue).ToList();

            priorityItems = priorityItems.OrderByDescending(i => i.Priority).Take(count).ToList();

            return priorityItems.Select(i => i.Item).ToList();
        }

        private static ItemWithPriorityValue GetItemWithPriorityValue(Item item)
        {
            if (item.LastLearnedRepeatDate == null)
                return new ItemWithPriorityValue
                {
                    Item = item,
                    Priority = 0
                };

            DateTime lastRepeatDate = item.LastLearnedRepeatDate ?? DateTime.Now;
            int span = (int) (DateTime.Now - lastRepeatDate).TotalDays;
            int priority = 0;

            if (item.LearnedRepeatsCount <= 10 && item.LearnedRepeatsCount >= 6)
            {
                if (span == SixToTenRepeatsSpanDays)
                    priority = SixToTenRepeatsBasePriority;
                else if (span > SixToTenRepeatsSpanDays)
                    priority = SixToTenRepeatsBasePriority +
                               SixToTenRepeatsSpanPriorityAddition * (span - SixToTenRepeatsSpanDays);
                else
                    priority = SixToTenRepeatsBasePriority +
                               SixToTenRepeatsSpanPriorityNegativeAddition * (span - SixToTenRepeatsSpanDays);
            }
            else if (item.LearnedRepeatsCount >= 4)
            {
                if (span == FourToFiveRepeatsSpanDays)
                    priority = FourToFiveRepeatsBasePriority;
                else if (span > FourToFiveRepeatsSpanDays)
                    priority = FourToFiveRepeatsBasePriority +
                               FourToFiveRepeatsSpanPriorityAddition * (span - FourToFiveRepeatsSpanDays);
                else
                    priority = FourToFiveRepeatsBasePriority +
                               FourToFiveRepeatsSpanPriorityNegativeAddition * (span - FourToFiveRepeatsSpanDays);
            }
            else if (item.LearnedRepeatsCount == 3)
            {
                if (span == ThirdRepeatSpanDays)
                    priority = ThirdRepeatBasePriority;
                else if (span > ThirdRepeatSpanDays)
                    priority = ThirdRepeatBasePriority +
                               ThirdRepeatSpanPriorityAddition * (span - ThirdRepeatSpanDays);
                else
                    priority = ThirdRepeatBasePriority +
                               ThirdRepeatSpanPriorityNegativeAddition * (span - ThirdRepeatSpanDays);
            }
            else if (item.LearnedRepeatsCount == 2)
            {
                if (span == SecondRepeatSpanDays)
                    priority = SecondRepeatBasePriority;
                else if (span > SecondRepeatSpanDays)
                    priority = SecondRepeatBasePriority +
                               SecondRepeatSpanPriorityAddition * (span - SecondRepeatSpanDays);
                else
                    priority = SecondRepeatBasePriority +
                               SecondRepeatSpanPriorityNegativeAddition * (span - SecondRepeatSpanDays);
            }
            else if (item.LearnedRepeatsCount == 1)
            {
                if (span == FirstRepeatSpanDays)
                    priority = FirstRepeatBasePriority;
                else if (span > FirstRepeatSpanDays)
                    priority = FirstRepeatBasePriority +
                               FirstRepeatSpanPriorityAddition * (span - FirstRepeatSpanDays);
                else
                    priority = FirstRepeatBasePriority +
                               FirstRepeatSpanPriorityNegativeAddition * (span - FirstRepeatSpanDays);
            }

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