using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class List
    {
        public class Query : IRequest<List<Item>>
        {
            public Guid DictionaryId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Item>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Item>> Handle(Query request, CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries
                    .Include(d => d.Items)
                    .SingleOrDefaultAsync(d => d.Id == request.DictionaryId);

                if (dictionary == null)
                    throw new Exception("Could not find dictionary");

                var items = dictionary.Items.ToList();

                return items;
            }
        }
    }
}