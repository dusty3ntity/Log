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

        public async Task<LearningList> Generate(Guid dictionaryId)
        {
            var dictionary = await _context.Dictionaries
                .Include(d => d.Items)
                .SingleOrDefaultAsync(d => d.Id == dictionaryId);

            if (dictionary.Items.Count == 0)
                throw new Exception("Too few items for generating learning list");

            var itemsList = dictionary.Items.ToList();

            var list = new List<LearningItem>();
            var random = new Random();

            for (int i = 0;
                i < Math.Min(dictionary.PreferredLearningListSize, dictionary.Items.Count);
                i++)
            {
                var item = new LearningItem
                {
                    Item = itemsList[i],
                    LearningMode = (LearningMode) random.Next(0, 2),
                    NumberInSequence = i
                };

                list.Add(item);
            }

            var learningList = new LearningList
            {
                Size = list.Count,
                CreationDate = DateTime.Now,
                CompletedItemsCount = 0,
                LearningItems = list
            };

            return learningList;
        }
    }
}