using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Dictionaries
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public int PreferredLearningListSize { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(d => d.PreferredLearningListSize)
                    .NotEmpty()
                    .InclusiveBetween(20, 60)
                    .WithMessage(
                        "Preferred learning list size must be from 20 to 60 items inclusively.");
            }
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
                var dictionary = await _context.Dictionaries.FindAsync(request.Id);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {dictionary = "Not found."});

                dictionary.PreferredLearningListSize =
                    request.PreferredLearningListSize != 0
                        ? request.PreferredLearningListSize
                        : dictionary.PreferredLearningListSize;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes.");
            }
        }
    }
}