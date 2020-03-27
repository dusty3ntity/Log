using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dictionaries
{
    public class Create
    {
        public class Command : IRequest<Guid>
        {
            public string KnownLanguageCode { get; set; }
            public string LanguageToLearnCode { get; set; }
            public int PreferredLearningListSize { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(d => d.KnownLanguageCode)
                    .NotEmpty()
                    .Must(BeValidLangISOCode)
                    .WithMessage("Please specify a valid ISO 639-1 language code.");
                RuleFor(d => d.LanguageToLearnCode)
                    .NotEmpty()
                    .NotEqual(d => d.KnownLanguageCode)
                    .Must(BeValidLangISOCode)
                    .WithMessage("Please specify a valid ISO 639-1 language code.");
                RuleFor(d => d.PreferredLearningListSize)
                    .NotEmpty()
                    .InclusiveBetween(20, 60)
                    .WithMessage(
                        "Preferred learning list size must be from 20 to 60 items inclusively.");
            }

            private bool BeValidLangISOCode(string languageCode)
            {
                if (languageCode == null)
                    return false;
                if (languageCode.Length != 2)
                    return false;
                return languageCode.All(c => c >= 'a' && c <= 'z');
            }
        }

        public class Handler : IRequestHandler<Command, Guid>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
            {
                var knownLanguage = await _context.Languages
                    .SingleOrDefaultAsync(l => l.ISOCode.Equals(request.KnownLanguageCode));
                var languageToLearn = await _context.Languages
                    .SingleOrDefaultAsync(l => l.ISOCode.Equals(request.LanguageToLearnCode));

                if (knownLanguage == null || languageToLearn == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {language = "Not found"});

                var dictionary = new Dictionary
                {
                    IsMain = false,
                    KnownLanguage = knownLanguage,
                    LanguageToLearn = languageToLearn,
                    PreferredLearningListSize = request.PreferredLearningListSize,
                    Items = new List<Item>(),
                };

                _context.Dictionaries.Add(dictionary);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return dictionary.Id;
                throw new Exception("Problem saving changes.");
            }
        }
    }
}