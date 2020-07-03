using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
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
            public int CorrectAnswersToItemCompletion { get; set; }
            public bool IsMain { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(d => d.KnownLanguageCode)
                    .Must(BeValidLangISOCode)
                    .WithMessage("Please specify a valid ISO 639-2 language code.");
                RuleFor(d => d.LanguageToLearnCode)
                    .Must(BeValidLangISOCode)
                    .WithMessage("Please specify a valid ISO 639-2 language code.")
                    .NotEqual(d => d.KnownLanguageCode);
                RuleFor(d => d.PreferredLearningListSize)
                    .InclusiveBetween(50, 100)
                    .WithMessage(
                        "Preferred learning list size must be from 50 to 100 items inclusively.");
                RuleFor(d => d.CorrectAnswersToItemCompletion)
                    .InclusiveBetween(5, 10)
                    .WithMessage(
                        "Learning item's correct answers count to completion must be from 5 to 10 inclusively.");
            }

            private bool BeValidLangISOCode(string languageCode)
            {
                if (languageCode == null)
                    return false;
                if (languageCode.Length != 3)
                    return false;
                return languageCode.All(c => c >= 'a' && c <= 'z');
            }
        }

        public class Handler : IRequestHandler<Command, Guid>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IDuplicatesChecker _duplicatesChecker;

            public Handler(DataContext context, IMapper mapper, IDuplicatesChecker duplicatesChecker)
            {
                _context = context;
                _mapper = mapper;
                _duplicatesChecker = duplicatesChecker;
            }

            public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
            {
                var knownLanguage = await _context.Languages
                    .SingleOrDefaultAsync(l => l.ISOCode.Equals(request.KnownLanguageCode));
                var languageToLearn = await _context.Languages
                    .SingleOrDefaultAsync(l => l.ISOCode.Equals(request.LanguageToLearnCode));

                if (knownLanguage == null || languageToLearn == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.LanguageNotFound);

                var dictionaries = await _context.Dictionaries.ToListAsync();

                var duplicate = await _duplicatesChecker.SearchForDuplicates(knownLanguage, languageToLearn);

                if (duplicate != null)
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.DuplicateDictionaryFound,
                        new
                        {
                            dictionary = _mapper.Map<Dictionary, DictionaryDto>(duplicate)
                        });

                if (request.IsMain)
                    foreach (var dict in dictionaries)
                        dict.IsMain = false;

                var dictionary = new Dictionary
                {
                    IsMain = request.IsMain,
                    KnownLanguage = knownLanguage,
                    LanguageToLearn = languageToLearn,

                    PreferredLearningListSize = request.PreferredLearningListSize,
                    CorrectAnswersToItemCompletion = request.CorrectAnswersToItemCompletion,

                    Items = new List<Item>()
                };

                _context.Dictionaries.Add(dictionary);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return dictionary.Id;
                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}