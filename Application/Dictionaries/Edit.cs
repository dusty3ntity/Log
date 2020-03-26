using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Dictionaries
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public int PreferredLearningListSize { get; set; }
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
                var dictionary = await _context.Dictionaries.FindAsync(request.Id);

                if (dictionary == null)
                    throw new Exception("Could not find dictionary");

                dictionary.PreferredLearningListSize =
                    request.PreferredLearningListSize != 0
                        ? request.PreferredLearningListSize
                        : dictionary.PreferredLearningListSize;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}