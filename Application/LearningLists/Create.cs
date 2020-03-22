using System;
using System.Threading;
using System.Threading.Tasks;
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
                var dictionary = await _context.Dictionaries
                    .Include(d => d.LearningList)
                    .SingleOrDefaultAsync(d => d.Id == request.DictionaryId);

                if (dictionary == null)
                    throw new Exception("Could not find dictionary");

                if (dictionary.LearningList != null)
                {
                    if (!DateChecker.IsLearningListOutdated(dictionary.LearningList))
                        return dictionary.LearningList.Id;
                    await _learningListRemover.Remove(dictionary);
                }

                var learningList = await _learningListGenerator.Generate(dictionary.Id);
                dictionary.LearningList = learningList;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return learningList.Id;
                throw new Exception("Problem saving learning list");
            }
        }
    }
}