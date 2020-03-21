﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
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
                    throw new Exception("Could not find dictionary");

                var item = dictionary.Items.SingleOrDefault(i => i.Id == request.ItemId);

                if (item == null)
                    throw new Exception("Could not find item");

                dictionary.Items.Remove(item);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}