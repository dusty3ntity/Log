using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Application.Utilities;
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
                    .MinimumLength(2)
                    .MaximumLength(30);
                RuleFor(i => i.Translation)
                    .MinimumLength(2)
                    .MaximumLength(30);
                RuleFor(i => i.Definition)
                    .MinimumLength(5)
                    .MaximumLength(100);
                RuleFor(i => i.DefinitionOrigin)
                    .MinimumLength(5)
                    .MaximumLength(24);
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
                if (request.Original == null &&
                    request.Translation == null &&
                    request.Definition == null)
                    throw new RestException(HttpStatusCode.BadRequest,
                        "At least one property must be provided to edit.");

                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {dictionary = "Not found."});

                var item = await _context.Items.FindAsync(request.ItemId);

                if (item == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {item = "Not found."});

                var newOriginal = request.Original?.ToLower() ?? item.Original;
                var newTranslation = request.Translation?.ToLower() ?? item.Translation;

                if (request.Original != null || request.Translation != null)
                    if (await _duplicatesChecker.IsDuplicate(request.DictionaryId, newOriginal,
                        newTranslation))
                        throw new RestException(HttpStatusCode.BadRequest, "Duplicate item found.");

                if (request.Definition != null && ItemChecker.DoesDefinitionContainItem(request.Definition,
                    newOriginal,
                    newTranslation))
                    throw new RestException(HttpStatusCode.BadRequest,
                        "Item's definition mustn't contain item's original or translation.");
                
                if (request.DefinitionOrigin != null && request.Definition == null)
                    throw new RestException(HttpStatusCode.BadRequest,
                        "Item's definition origin can't be provided without definition.");

                item.Original = newOriginal;
                item.Translation = newTranslation;
                item.Definition = request.Definition ?? item.Definition;
                if (request.Original != null || request.Translation != null)
                {
                    if (item.IsLearned)
                        dictionary.LearnedItemsCount--;
                    item.IsLearned = false;
                    item.CorrectAnswersCount = 0;
                    item.CreationDate = DateTime.Now;
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes.");
            }
        }
    }
}