using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Utilities;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid DictionaryId { get; set; }
            public Guid ItemId { get; set; }

            public string Original { get; set; }
            public string Translation { get; set; }
            public string Definition { get; set; }
            public string DefinitionOrigin { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(i => i.Original)
                    .NotEmpty()
                    .Length(2, 30);
                RuleFor(i => i.Translation)
                    .NotEmpty()
                    .Length(2, 30);
                RuleFor(i => i.Definition)
                    .Length(5, 100);
                RuleFor(i => i.DefinitionOrigin)
                    .Null().When(c => c.Definition == null)
                    .WithMessage("Definition origin can't be provided without definition.")
                    .Length(5, 24);
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IDuplicatesChecker _duplicatesChecker;

            public Handler(DataContext context, IDuplicatesChecker duplicatesChecker)
            {
                _context = context;
                _duplicatesChecker = duplicatesChecker;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.DictionaryNotFound);

                var item = await _context.Items.FindAsync(request.ItemId);

                if (item == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.ItemNotFound);

                var originalLower = request.Original.ToLower();
                var translationLower = request.Translation.ToLower();

                if (request.Definition != null && ItemChecker.DoesDefinitionContainItem(request.Definition,
                    originalLower,
                    translationLower))
                    throw new RestException(HttpStatusCode.BadRequest,
                        ErrorType.ItemDefinitionContainsOriginalOrTranslation);

                if (!item.Original.ToLower().Equals(originalLower) ||
                    !item.Translation.ToLower().Equals(translationLower))
                {
                    if (ItemChecker.AreEqual(originalLower, translationLower))
                        throw new RestException(HttpStatusCode.BadRequest,
                            ErrorType.ItemOriginalOrTranslationContainEachOther);

                    if (item.IsLearned)
                    {
                        if (item.Type == ItemType.Word)
                            dictionary.LearnedWordsCount--;
                        else
                            dictionary.LearnedPhrasesCount--;
                    }

                    item.IsLearned = false;
                    item.CorrectAnswersToCompletionCount = 0;
                    item.CreationDate = DateTime.Now;
                }

                item.Original = request.Original;
                item.Translation = request.Translation;
                item.Definition = request.Definition;
                item.DefinitionOrigin = request.DefinitionOrigin;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}