using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Unstar
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
                    throw new Exception("Could not find dictionary");

                var item = await _context.Items.FindAsync(request.ItemId);

                if (item == null)
                    throw new Exception("Could not find item");

                if (!item.IsStarred)
                    return Unit.Value;

                item.IsStarred = false;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}