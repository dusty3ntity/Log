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
    public class Create
    {
        public class Command : IRequest<Guid>
        {
            public Guid DictionaryId { get; set; }

            public string Original { get; set; }
            public string Translation { get; set; }
            public string Definition { get; set; }
            public string DefinitionOrigin { get; set; }
            public ItemType Type { get; set; }

            public bool IsStarred { get; set; }
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
                RuleFor(i => i.Type)
                    .NotEmpty()
                    .IsInEnum()
                    .WithMessage("Item must be either a word or a phrase.");
            }
        }

        public class Handler : IRequestHandler<Command, Guid>
        {
            private readonly DataContext _context;
            private readonly IDuplicatesChecker _duplicatesChecker;

            public Handler(DataContext context, IDuplicatesChecker duplicatesChecker)
            {
                _context = context;
                _duplicatesChecker = duplicatesChecker;
            }

            public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.DictionaryNotFound);

                if (dictionary.WordsCount + dictionary.PhrasesCount == 8000)
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.ItemsLimitReached);

                var originalLower = request.Original.ToLower();
                var translationLower = request.Translation.ToLower();

                if (ItemChecker.AreEqual(originalLower, translationLower))
                    throw new RestException(HttpStatusCode.BadRequest,
                        ErrorType.ItemOriginalOrTranslationContainEachOther);

                if (request.Definition != null && ItemChecker.DoesDefinitionContainItem(request.Definition,
                    originalLower,
                    translationLower))
                    throw new RestException(HttpStatusCode.BadRequest,
                        ErrorType.ItemDefinitionContainsOriginalOrTranslation);

                var item = new Item
                {
                    Dictionary = dictionary,

                    Original = request.Original,
                    Translation = request.Translation,
                    Definition = request.Definition,
                    DefinitionOrigin = request.DefinitionOrigin,
                    Type = request.Type,
                    CreationDate = DateTime.Now,

                    IsStarred = request.IsStarred,

                    GoesForNextDay = request.IsStarred,
                };

                if (item.Type == ItemType.Word)
                    dictionary.WordsCount++;
                else
                    dictionary.PhrasesCount++;

                _context.Items.Add(item);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return item.Id;
                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}