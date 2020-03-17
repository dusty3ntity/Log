using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dictionaries
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; } // Client-generated guid
            public string Name { get; set; }
            public string KnownLanguageCode { get; set; }
            public string LanguageToLearnCode { get; set; }
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
                var knownLanguage = await
                    _context.Languages.SingleOrDefaultAsync(l =>
                        l.ISOCode.Equals(request.KnownLanguageCode));
                var languageToLearn = await
                    _context.Languages.SingleOrDefaultAsync(l =>
                        l.ISOCode.Equals(request.LanguageToLearnCode));

                if (knownLanguage == null || languageToLearn == null)
                    throw new Exception("Could not find language");

                var dictionary = new Dictionary
                {
                    Id = request.Id,
                    Name = request.Name,
                    KnownLanguage = knownLanguage,
                    LanguageToLearn = languageToLearn,
                    PreferredLearningListSize = request.PreferredLearningListSize
                };

                _context.Dictionaries.Add(dictionary);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}