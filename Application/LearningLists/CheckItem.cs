using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.LearningItems;
using Application.Utilities;
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
            public int HintsUsed { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(i => i.LearningItemId)
                    .NotEmpty();
                RuleFor(i => i.Answer)
                    .MaximumLength(30);
                RuleFor(i => i.HintsUsed)
                    .InclusiveBetween(0, 2);
            }
        }

        public class Handler : IRequestHandler<Command, LearningItemResult>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<LearningItemResult> Handle(Command request, CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.DictionaryNotFound);

                var learningList = await _context.LearningLists.FindAsync(request.LearningListId);

                if (learningList == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.LearningListNotFound);

                if (DateChecker.IsLearningListOutdated(learningList))
                    throw new RestException(HttpStatusCode.Gone, ErrorType.LearningListOutdated);

                var learningItem = await _context.LearningItems
                    .Where(i => i.Id == request.LearningItemId)
                    .Include(i => i.Item)
                    .FirstOrDefaultAsync();

                if (learningItem == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.LearningItemNotFound);

                if (learningItem.NumberInSequence != learningList.CompletedItemsCount)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.LearningItemNotFound);

                var answer = request.Answer.ToLower();
                var item = learningItem.Item;
                var correctAnswersToCompletionCount = item.CorrectAnswersToCompletionCount;

                var isAnswerCorrect = learningItem.LearningMode == LearningMode.Primary
                    ? answer.ToLower().Equals(item.Original.ToLower())
                    : answer.ToLower().Equals(item.Translation.ToLower());

                if (isAnswerCorrect)
                    learningList.CorrectAnswersCount++;

                ItemAnswerProcessor.ProcessItemAnswer(learningList, learningItem, isAnswerCorrect);

                learningList.CompletedItemsCount++;
                learningList.TotalCompletedItemsCount++;

                if (learningList.Size == learningList.CompletedItemsCount)
                {
                    learningList.CompletedItemsCount = 0;
                    learningList.IsCompleted = true;
                    learningList.TimesCompleted++;
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return new LearningItemResult
                    {
                        IsAnswerCorrect = isAnswerCorrect,
                        UserAnswer = request.Answer ?? "",
                        NumberInSequence = learningItem.NumberInSequence,

                        Item = new TestItemAnswer
                        {
                            Item = learningItem.LearningMode == LearningMode.Primary ? item.Translation : item.Original,
                            Answer = learningItem.LearningMode == LearningMode.Primary
                                ? item.Original
                                : item.Translation,
                            Definition = item.Definition,
                            DefinitionOrigin = item.DefinitionOrigin,
                            Type = item.Type,

                            IsStarred = item.IsStarred,
                            IsLearned = item.IsLearned,
                            CorrectAnswersToCompletionCount = correctAnswersToCompletionCount,
                        }
                    };
                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}