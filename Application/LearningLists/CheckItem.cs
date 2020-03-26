﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Items;
using Application.LearningItems;
using Application.Utilities;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class CheckItem
    {
        public class Command : IRequest<LearningItemAnswer>
        {
            public Guid LearningListId { get; set; }
            public Guid LearningItemId { get; set; }
            public string Answer { get; set; }
        }

        public class Handler : IRequestHandler<Command, LearningItemAnswer>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<LearningItemAnswer> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var learningList = await _context.LearningLists.FindAsync(request.LearningListId);

                if (learningList == null)
                    throw new Exception("Could not find learning list");

                if (DateChecker.IsLearningListOutdated(learningList))
                    throw new Exception("Learning list is outdated. Try generating a new one");

                var learningItem = await _context.LearningItems
                    .Where(i => i.Id == request.LearningItemId)
                    .Include(i => i.Item)
                    .FirstOrDefaultAsync();

                if (learningItem == null)
                    throw new Exception("Could not find learning item");

                if (learningItem.NumberInSequence != learningList.CompletedItemsCount)
                    throw new Exception("Incorrect learning item");

                var item = learningItem.Item;

                item.TotalRepeatsCount++;
                learningList.CompletedItemsCount++;

                if (learningList.Size == learningList.CompletedItemsCount)
                    learningList.IsCompleted = true;

                var isAnswerCorrect = learningItem.LearningMode == LearningMode.Primary
                    ? request.Answer.Equals(item.Original)
                    : request.Answer.Equals(item.Translation);

                if (isAnswerCorrect)
                {
                    item.CorrectRepeatsCount++;
                    item.GoesForNextDay = false;

                    if (item.CorrectRepeatsCount == 5) // Take this out somehow...
                    {
                        item.IsLearned = true;
                        item.IsStarred = false;
                    }
                }
                else
                {
                    item.GoesForNextDay = true;
                    item.IsLearned = false;
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return new LearningItemAnswer
                    {
                        IsAnswerCorrect = isAnswerCorrect,
                        Item = _mapper.Map<Item, ItemDto>(item)
                    };
                throw new Exception("Problem saving changes");
            }
        }
    }
}