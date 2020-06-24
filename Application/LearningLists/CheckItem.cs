using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Items;
using Application.LearningItems;
using Application.Utilities;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class CheckItem
    {
        public class Command : IRequest<LearningItemResult>
        {
            public Guid DictionaryId { get; set; }
            public Guid LearningListId { get; set; }
            public Guid LearningItemId { get; set; }
            public string Answer { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(i => i.LearningItemId)
                    .NotEmpty();
                RuleFor(i => i.Answer)
                    .NotEmpty()
                    .MinimumLength(2)
                    .MaximumLength(30);
            }
        }

        public class Handler : IRequestHandler<Command, LearningItemResult>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<LearningItemResult> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {dictionary = "Not found."});

                var learningList = await _context.LearningLists.FindAsync(request.LearningListId);

                if (learningList == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {learningList = "Not found."});

                if (DateChecker.IsLearningListOutdated(learningList))
                    throw new RestException(HttpStatusCode.Gone,
                        "Learning list is outdated. Try generating a new one.");

                var learningItem = await _context.LearningItems
                    .Where(i => i.Id == request.LearningItemId)
                    .Include(i => i.Item)
                    .FirstOrDefaultAsync();

                if (learningItem == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {learningItem = "Not found."});
                
                var completedItemsCount = learningList.TimesCompleted == 0
                    ? learningList.CompletedItemsCount
                    : learningList.CompletedItemsCount - learningList.Size;

                if (learningItem.NumberInSequence != completedItemsCount)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {item = "Not found."});

                var item = learningItem.Item;

                item.TotalRepeatsCount++;
                learningList.CompletedItemsCount++;

                if (learningList.Size == completedItemsCount + 1)
                {
                    learningList.IsCompleted = true;
                    learningList.TimesCompleted++;
                }

                var isAnswerCorrect = learningItem.LearningMode == LearningMode.Primary
                    ? request.Answer.Equals(item.Original)
                    : request.Answer.Equals(item.Translation);

                if (isAnswerCorrect)
                {
                    item.CorrectAnswersCount++;
                    learningList.CorrectAnswersCount++;
                    item.GoesForNextDay = false;

                    if (item.CorrectAnswersCount == 5) // Take this out somehow...
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
                    return new LearningItemResult
                    {
                        IsAnswerCorrect = isAnswerCorrect,
                        UserAnswer = request.Answer,
                        Item = new TestItemAnswer
                        {
                          Item = learningItem.LearningMode == LearningMode.Primary ? item.Translation : item.Original,
                          Answer = learningItem.LearningMode == LearningMode.Primary ? item.Original : item.Translation,
                          Definition = item.Definition,
                          DefinitionOrigin = item.DefinitionOrigin,
                          Type = item.Type,
                          IsStarred = item.IsStarred,
                          CorrectAnswersCount = item.CorrectAnswersCount
                        }
                    };
                throw new Exception("Problem saving changes.");
            }
        }
    }
}