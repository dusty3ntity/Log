using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class LearningListGenerator : ILearningListGenerator
    {
        private readonly DataContext _context;
        private static Random _rand;

        public LearningListGenerator(DataContext context)
        {
            _context = context;
            _rand = new Random();
        }

        public static void Shuffle(List<LearningItem> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = _rand.Next(n + 1);
                LearningItem value = list[k];
                list[k] = list[n];
                list[n] = value;
            }

            for (var i = 0; i < list.Count; i++)
                list[i].NumberInSequence = i;
        }

        public async Task<LearningList> Generate(Guid dictionaryId, int preferredLearningListSize)
        {
            var items = await _context.Items
                .Where(i => i.DictionaryId == dictionaryId)
                .ToListAsync();

            if (items.Count == 0)
                throw new RestException(HttpStatusCode.BadRequest,
                    "Too few items for generating learning list.");

            var list = new List<LearningItem>();

            for (int i = 0;
                i < Math.Min(preferredLearningListSize, items.Count);
                i++)
            {
                var item = new LearningItem
                {
                    Item = items[i],
                    LearningMode = _rand.Next(0, 2) == 0 ? LearningMode.Primary : LearningMode.Secondary,
                };

                list.Add(item);
            }

            Shuffle(list);

            var learningList = new LearningList
            {
                DictionaryId = dictionaryId,
                Size = list.Count,
                CreationDate = DateTime.Now,
                CompletedItemsCount = 0,
                LearningItems = list
            };

            return learningList;
        }
    }
}