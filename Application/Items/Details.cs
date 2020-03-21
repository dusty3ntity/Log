using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Details
    {
        public class Query : IRequest<Item>
        {
            public Guid DictionaryId { get; set; }
            public Guid ItemId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Item>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Item> Handle(Query request, CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new Exception("Could not find dictionary");

                var item = dictionary.Items.SingleOrDefault(i => i.Id == request.ItemId);

                if (item == null)
                    throw new Exception("Could not find item");

                return item;
            }
        }
    }
}