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
                    .MinimumLength(2)
                    .MaximumLength(30);
                RuleFor(i => i.Translation)
                    .NotEmpty()
                    .MinimumLength(2)
                    .MaximumLength(30)
                    .NotEqual(i => i.Original);
                RuleFor(i => i.Definition)
                    .MinimumLength(5)
                    .MaximumLength(100);
                RuleFor(i => i.DefinitionOrigin)
                    .MinimumLength(5)
                    .MaximumLength(24);
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
                    throw new RestException(HttpStatusCode.NotFound,
                        new {dictionary = "Not found."});

                request.Original = request.Original.ToLower();
                request.Translation = request.Translation.ToLower();

                if (ItemChecker.AreEqual(request.Original, request.Translation))
                    throw new RestException(HttpStatusCode.BadRequest,
                        "Item's original and translation mustn't be equal or contain each other.");

                if (request.Definition != null && ItemChecker.DoesDefinitionContainItem(request.Definition,
                    request.Original,
                    request.Translation))
                    throw new RestException(HttpStatusCode.BadRequest,
                        "Item's definition mustn't contain item's original or translation.");

                if (request.DefinitionOrigin != null && request.Definition == null)
                    throw new RestException(HttpStatusCode.BadRequest,
                        "Item's definition origin can't be provided without definition.");

                var item = new Item
                {
                    Original = request.Original,
                    Translation = request.Translation,
                    Definition = request.Definition,
                    DefinitionOrigin = request.DefinitionOrigin,
                    CreationDate = DateTime.Now,
                    Dictionary = dictionary,
                    IsLearned = false,
                    IsStarred = request.IsStarred,
                    Type = request.Type,
                    CorrectAnswersCount = 0,
                    TotalRepeatsCount = 0,
                    GoesForNextDay = request.IsStarred
                };

                if (await _duplicatesChecker.IsDuplicate(request.DictionaryId, item))
                    throw new RestException(HttpStatusCode.BadRequest, "Duplicate item found.");

                if (item.Type == ItemType.Word)
                    dictionary.WordsCount++;
                else
                    dictionary.PhrasesCount++;

                _context.Items.Add(item);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return item.Id;
                throw new Exception("Problem saving changes.");
            }
        }
    }
}