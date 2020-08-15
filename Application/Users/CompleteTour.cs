using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class CompleteTour
    {
        public class Command : IRequest
        {
            public bool TourCompleted { get; set; }
            public bool ItemsTourCompleted { get; set; }
            public bool NewItemTourCompleted { get; set; }
            public bool LearningTourCompleted { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _context = context;
                _userManager = userManager;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                if (!request.TourCompleted && !request.ItemsTourCompleted && !request.NewItemTourCompleted &&
                    !request.LearningTourCompleted)
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.DefaultValidationError);

                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                if (request.TourCompleted)
                {
                    user.TourCompleted = true;
                    user.ItemsTourCompleted = true;
                    user.NewItemTourCompleted = true;
                    user.LearningTourCompleted = true;
                }
                else if (request.ItemsTourCompleted)
                    user.ItemsTourCompleted = true;
                else if (request.NewItemTourCompleted)
                    user.NewItemTourCompleted = true;
                else if (request.LearningTourCompleted)
                    user.LearningTourCompleted = true;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                    return Unit.Value;
                throw new Exception("Problem saving changes");
            }
        }
    }
}