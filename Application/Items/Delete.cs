using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid DictionaryId { get; set; }
            public Guid ItemId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.DictionaryNotFound);

                var item = await _context.Items.FindAsync(request.ItemId);

                if (item == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.ItemNotFound);

                if (item.Type == ItemType.Word)
                    dictionary.WordsCount--;
                else
                    dictionary.PhrasesCount--;

                _context.Items.Remove(item);

                var learningList = await _context.LearningLists.Where(l => l.DictionaryId == request.DictionaryId)
                    .FirstOrDefaultAsync();

                if (learningList != null)
                {
                    learningList = await _context.LearningLists.Where(l => l.Id == learningList.Id)
                        .Include(l => l.LearningItems).FirstOrDefaultAsync();

                    LearningItem currentItem = null;

                    foreach (var i in learningList.LearningItems)
                    {
                        if (i.ItemId == request.ItemId)
                            currentItem = i;
                    }

                    if (currentItem != null)
                    {
                        foreach (var i in learningList.LearningItems)
                        {
                            if (i.NumberInSequence > currentItem.NumberInSequence)
                                i.NumberInSequence--;
                        }

                        if (currentItem.NumberInSequence <= learningList.CompletedItemsCount &&
                            learningList.CompletedItemsCount > 0)
                            learningList.CompletedItemsCount--;

                        learningList.Size--;
                        _context.LearningItems.Remove(currentItem);
                    }
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}