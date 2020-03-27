using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Utilities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class Create
    {
        public class Command : IRequest<Guid>
        {
            public Guid DictionaryId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Guid>
        {
            private readonly DataContext _context;
            private readonly ILearningListGenerator _learningListGenerator;
            private readonly ILearningListRemover _learningListRemover;

            public Handler(DataContext context, ILearningListGenerator learningListGenerator,
                ILearningListRemover learningListRemover)
            {
                _context = context;
                _learningListGenerator = learningListGenerator;
                _learningListRemover = learningListRemover;
            }

            public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {dictionary = "Not found"});

                var learningList = await _context.LearningLists
                    .Where(l => l.DictionaryId == request.DictionaryId)
                    .Include(l => l.LearningItems)
                    .FirstOrDefaultAsync();

                if (learningList != null)
                {
                    if (!DateChecker.IsLearningListOutdated(learningList))
                        return learningList.Id;
                    await _learningListRemover.Remove(learningList);
                }

                learningList = await _learningListGenerator.Generate(dictionary.Id,
                    dictionary.PreferredLearningListSize);

                _context.LearningLists.Add(learningList);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return learningList.Id;
                throw new Exception("Problem saving learning list");
            }
        }
    }
}