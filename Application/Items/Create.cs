using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
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
            public string Description { get; set; }
            public int Type { get; set; }
            public bool IsStarred { get; set; }
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
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {dictionary = "Not found"});

                var item = new Item
                {
                    Original = request.Original,
                    Translation = request.Translation,
                    Description = request.Description,
                    CreationDate = DateTime.Now,
                    Dictionary = dictionary,
                    IsLearned = false,
                    IsStarred = request.IsStarred,
                    Type = (ItemType) request.Type,
                    CorrectRepeatsCount = 0,
                    TotalRepeatsCount = 0,
                    GoesForNextDay = request.IsStarred
                };

                if (item.Type == ItemType.Word)
                    dictionary.WordsCount++;
                else
                    dictionary.PhrasesCount++;

                _context.Items.Add(item);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return item.Id;
                throw new Exception("Problem saving changes");
            }
        }
    }
}