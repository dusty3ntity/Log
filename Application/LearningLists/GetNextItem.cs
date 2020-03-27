using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.LearningItems;
using Application.Utilities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class GetNextItem
    {
        public class Query : IRequest<LearningItemDto>
        {
            public Guid DictionaryId { get; set; }
            public Guid LearningListId { get; set; }
        }

        public class Handler : IRequestHandler<Query, LearningItemDto>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<LearningItemDto> Handle(Query request,
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

                if (learningList.IsCompleted)
                    return null;

                var learningItem = await _context.LearningItems
                    .Where(i =>
                        i.LearningListId == learningList.Id &&
                        i.NumberInSequence == learningList.CompletedItemsCount)
                    .Include(i => i.Item)
                    .FirstAsync();

                if (learningItem.Item == null)
                {
                    learningList.CompletedItemsCount++;

                    var success = await _context.SaveChangesAsync() > 0;

                    if (!success)
                        throw new Exception("Problem saving changes.");

                    throw new RestException(HttpStatusCode.Gone,
                        "Item has been removed. Try again to get the next item.");
                }

                var itemToReturn = new LearningItemDto
                {
                    Id = learningItem.Id,
                    NumberInSequence = learningItem.NumberInSequence,
                    LearningMode = learningItem.LearningMode,
                    Item = TestItemCreator.Create(learningItem)
                };

                return itemToReturn;
            }
        }
    }
}