using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Utilities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class StartOver
    {
        public class Command : IRequest
        {
            public Guid DictionaryId { get; set; }
            public Guid LearningListId { get; set; }
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
                        new {dictionary = "Not found."});

                var learningList = await _context.LearningLists
                    .Where(l => l.DictionaryId == request.DictionaryId)
                    .Include(l => l.LearningItems)
                    .FirstOrDefaultAsync();

                if (learningList == null)
                    throw new RestException(HttpStatusCode.NotFound, new {learningList = "Not found"});

                if (learningList.TimesCompleted == 0 || !learningList.IsCompleted)
                    throw new RestException(HttpStatusCode.BadRequest, new {learningList = "Isn't completed yet"});

                if (learningList.TimesCompleted == 2)
                    throw new RestException(HttpStatusCode.BadRequest,
                        new {learningList = "Is already completed two times"});

                learningList.IsCompleted = false;
                
                var learningItemsList = learningList.LearningItems.ToList();
                LearningListShuffler.Shuffle(learningItemsList);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}