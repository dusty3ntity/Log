using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Utilities;
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

        public async Task<LearningList> Generate(Guid dictionaryId, int preferredLearningListSize,
            int correctAnswersToItemCompletion)
        {
            var items = await _context.Items
                .Where(i => i.DictionaryId == dictionaryId)
                .ToListAsync();

            if (items.Count < 10)
                throw new RestException(HttpStatusCode.BadRequest,
                    "Minimum 10 items are needed to create a learning list.");

            var list = new List<LearningItem>();

            for (int i = 0;
                i < Math.Min(preferredLearningListSize, items.Count);
                i++)
            {
                var item = new LearningItem
                {
                    Item = items[i],
                    LearningMode = _rand.Next(2) == 0 ? LearningMode.Primary : LearningMode.Secondary,
                };

                list.Add(item);
            }

            LearningListShuffler.Shuffle(list);

            var learningList = new LearningList
            {
                DictionaryId = dictionaryId,

                Size = list.Count,
                CreationDate = DateTime.Now,

                CorrectAnswersToItemCompletion = correctAnswersToItemCompletion,
                
                LearningItems = list
            };

            return learningList;
        }
    }
}