using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Utilities;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.LearningLists
{
    public class Create
    {
        public class Command : IRequest<LearningListDto>
        {
            public Guid DictionaryId { get; set; }
        }

        public class Handler : IRequestHandler<Command, LearningListDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ILearningListGenerator _learningListGenerator;
            private readonly ILearningListRemover _learningListRemover;

            public Handler(DataContext context, IMapper mapper, ILearningListGenerator learningListGenerator,
                ILearningListRemover learningListRemover)
            {
                _context = context;
                _mapper = mapper;
                _learningListGenerator = learningListGenerator;
                _learningListRemover = learningListRemover;
            }

            public async Task<LearningListDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.DictionaryNotFound);

                var learningList = await _context.LearningLists
                    .Where(l => l.DictionaryId == request.DictionaryId)
                    .Include(l => l.LearningItems)
                    .FirstOrDefaultAsync();

                if (learningList != null)
                {
                    if (!DateChecker.IsLearningListOutdated(learningList))
                        return _mapper.Map<LearningList, LearningListDto>(learningList);
                    await _learningListRemover.Remove(learningList);
                }

                learningList = await _learningListGenerator.Generate(dictionary.Id,
                    dictionary.PreferredLearningListSize, dictionary.CorrectAnswersToItemCompletion);

                _context.LearningLists.Add(learningList);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return _mapper.Map<LearningList, LearningListDto>(learningList);
                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}