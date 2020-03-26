using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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
                var learningList = await _context.LearningLists.FindAsync(request.LearningListId);

                if (learningList == null)
                    throw new Exception("Could not find learning list");

                if (DateChecker.IsLearningListOutdated(learningList))
                    throw new Exception("Learning list is outdated. Try generating a new one");

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
                        throw new Exception("Problem saving changes");

                    throw new Exception("Item has been removed. Try again to get the next item");
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