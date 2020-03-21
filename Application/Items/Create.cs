using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid DictionaryId { get; set; }
            public string Original { get; set; }
            public string Translation { get; set; }
            public string Description { get; set; }
            public string ItemType { get; set; }
            public bool IsStarred { get; set; }
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
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);
                if (dictionary == null)
                    throw new Exception("Could not find dictionary");

                var item = new Item
                {
                    Original = request.Original,
                    Translation = request.Translation,
                    Description = request.Description,
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = request.IsStarred,
                    ItemType = request.ItemType.Equals("word") ? ItemType.Word : ItemType.Phrase,
                    CorrectRepeatsCount = 0,
                    TotalRepeatsCount = 0,
                    GoesForNextDay = request.IsStarred
                };

                dictionary.Items.Add(item);

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}