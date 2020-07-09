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

        public async Task<LearningList> Generate(Dictionary dictionary)
        {
            var items = await _context.Items
                .Where(i => i.DictionaryId == dictionary.Id)
                .ToListAsync();

            if (items.Count < 10)
                throw new RestException(HttpStatusCode.BadRequest, ErrorType.NotEnoughItemsForLearningListGeneration);

            var list = new List<LearningItem>();

            for (int i = 0;
                i < Math.Min(dictionary.PreferredLearningListSize, items.Count);
                i++)
            {
                var item = new LearningItem
                {
                    Item = items[i],
                    LearningMode = _rand.Next(9) > 2 ? LearningMode.Primary : LearningMode.Secondary,
                };

                list.Add(item);
            }

            LearningListShuffler.Shuffle(list);

            var learningList = new LearningList
            {
                DictionaryId = dictionary.Id,

                Size = list.Count,
                CreationDate = DateTime.Now,

                CorrectAnswersToItemCompletion = dictionary.CorrectAnswersToItemCompletion,
                IsHardModeEnabled = dictionary.IsHardModeEnabled,

                LearningItems = list
            };

            return learningList;
        }
    }
}