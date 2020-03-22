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
                var learningList = await _context.LearningLists
                    .Include(l => l.LearningItems)
                    .ThenInclude(i => i.Item)
                    .SingleOrDefaultAsync(l => l.Id == request.LearningListId);

                if (learningList == null)
                    throw new Exception("Could not find learning list");

                if (DateChecker.IsLearningListOutdated(learningList))
                    throw new Exception("Learning list is outdated. Try generating a new one");

                if (learningList.Completed)
                    return null;

                var learningItem = learningList.LearningItems
                        .OrderBy(i => i.NumberInSequence)
                        .ToList()[learningList.CompletedItemsCount];

                var itemToReturn = new LearningItemDto
                {
                    Id = learningItem.Id,
                    NumberInSequence = learningList.CompletedItemsCount,
                    LearningMode = learningItem.LearningMode,
                    Item = TestItemCreator.Create(learningItem)
                };

                return itemToReturn;
            }
        }
    }
}