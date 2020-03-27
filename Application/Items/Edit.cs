using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid DictionaryId { get; set; }
            public Guid ItemId { get; set; }
            public string Original { get; set; }
            public string Translation { get; set; }
            public string Description { get; set; }
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
                    throw new RestException(HttpStatusCode.NotFound,
                        new {dictionary = "Not found"});

                var item = await _context.Items.FindAsync(request.ItemId);

                if (item == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {item = "Not found"});

                item.Original = request.Original ?? item.Original;
                item.Translation = request.Translation ?? item.Translation;
                item.Description = request.Description ?? item.Description;
                if (request.Original != null || request.Translation != null)
                {
                    if (item.IsLearned)
                        dictionary.LearnedItemsCount--;
                    item.IsLearned = false;
                    item.CorrectRepeatsCount = 0;
                    item.CreationDate = DateTime.Now;
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}