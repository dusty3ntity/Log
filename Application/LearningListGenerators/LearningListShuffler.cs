using System;
using System.Collections.Generic;
using Domain;

namespace Application.LearningListGenerators
{
    public static class LearningListShuffler
    {
        private static readonly Random Rand = new Random();

        public static void Shuffle(List<Item> list)
        {
            var n = list.Count;
            while (n > 1)
            {
                n--;
                var k = Rand.Next(n + 1);
                Item value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }

        public static void Shuffle(List<LearningItem> list)
        {
            var n = list.Count;
            while (n > 1)
            {
                n--;
                var k = Rand.Next(n + 1);
                LearningItem value = list[k];
                list[k] = list[n];
                list[n] = value;
            }

            for (var i = 0; i < list.Count; i++)
                list[i].NumberInSequence = i;
        }
    }
}