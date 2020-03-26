using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class LearningListGenerator : ILearningListGenerator
    {
        private readonly DataContext _context;

        public LearningListGenerator(DataContext context)
        {
            _context = context;
        }

        public async Task<LearningList> Generate(Guid dictionaryId, int preferredLearningListSize)
        {
            var items = await _context.Items
                .Where(i => i.DictionaryId == dictionaryId)
                .ToListAsync();

            if (items.Count == 0)
                throw new Exception("Too few items for generating learning list");

            var list = new List<LearningItem>();
            var random = new Random();

            for (int i = 0;
                i < Math.Min(preferredLearningListSize, items.Count);
                i++)
            {
                var item = new LearningItem
                {
                    Item = items[i],
                    LearningMode = (LearningMode) random.Next(0, 2),
                    NumberInSequence = i
                };

                list.Add(item);
            }

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