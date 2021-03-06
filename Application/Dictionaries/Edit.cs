﻿using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dictionaries
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public int PreferredLearningListSize { get; set; }
            public int CorrectAnswersToItemCompletion { get; set; }

			public bool IsMain { get; set; }
            public bool IsHardModeEnabled { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(d => d.PreferredLearningListSize)
                    .InclusiveBetween(50, 100)
                    .WithMessage(
                        "Preferred learning list size must be from 50 to 100 items inclusively.");
                RuleFor(d => d.CorrectAnswersToItemCompletion)
                    .InclusiveBetween(5, 10)
                    .WithMessage(
                        "Learning item's correct answers count to completion must be from 5 to 10 inclusively.");
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
                if (request.PreferredLearningListSize == 0 && request.CorrectAnswersToItemCompletion == 0)
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.NoPropsForEditProvided);

                var dictionary = await _context.Dictionaries.FindAsync(request.Id);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.DictionaryNotFound);

				if (request.IsMain) {
					var dictionaries = await _context.Dictionaries.ToListAsync();
					
                    foreach (var dict in dictionaries)
                        dict.IsMain = false;
				}

                dictionary.PreferredLearningListSize = request.PreferredLearningListSize;
                dictionary.CorrectAnswersToItemCompletion = request.CorrectAnswersToItemCompletion;
				dictionary.IsHardModeEnabled = request.IsHardModeEnabled;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}