using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.LearningListGenerators;
using Application.Utilities;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class LearningListGenerationHandler : ILearningListGenerator
    {
        private readonly DataContext _context;

        public LearningListGenerationHandler(DataContext context)
        {
            _context = context;
        }

        public async Task<LearningList> HandleGeneration(Dictionary dictionary)
        {
            var items = await _context.Items
                .Where(i => i.DictionaryId == dictionary.Id)
                .ToListAsync();

            if (items.Count < 10)
                throw new RestException(HttpStatusCode.BadRequest, ErrorType.NotEnoughItemsForLearningListGeneration);

            var list = LearningListGenerator.Generate(items, dictionary.PreferredLearningListSize);

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