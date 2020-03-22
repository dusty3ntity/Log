using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    // For testing purposes, should be deleted soon
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid DictionaryId { get; set; }
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
                var dictionary = await _context.Dictionaries
                    .Include(d => d.LearningList)
                    .SingleOrDefaultAsync(d => d.Id == request.DictionaryId);

                if (dictionary == null)
                    throw new Exception("Could not find dictionary");

                _context.LearningLists.Remove(dictionary.LearningList);
                dictionary.LearningList = null;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}