using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class Resigter
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(u => u.DisplayName).NotEmpty().MinimumLength(3).MaximumLength(20);
                RuleFor(u => u.Username).NotEmpty().MinimumLength(3).MaximumLength(20)
                    .Matches("^[A-Za-z][a-zA-Z0-9]{2,}$");
                RuleFor(u => u.Email).NotEmpty().MaximumLength(30).EmailAddress();
                RuleFor(u => u.Password).NotEmpty().MinimumLength(8).MaximumLength(20).Matches("[0-9]")
                    .WithMessage("Password must contain a digit");
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var normalizedEmail = request.Email.ToUpper();
                var normalizedUsername = request.Username.ToUpper();

                if (await _context.Users.AnyAsync(u => u.NormalizedEmail == normalizedEmail))
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.DuplicateEmailFound);

                if (await _context.Users.AnyAsync(u => u.NormalizedUserName == normalizedUsername))
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.DuplicateUsernameFound);

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username,
                    RefreshToken = _jwtGenerator.GenerateRefreshToken(),
                    RefreshTokenExpiry = DateTime.Now.AddDays(30),
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Email = user.Email,
                        Username = user.UserName,
                        
                        Token = _jwtGenerator.CreateToken(user),
                        RefreshToken = user.RefreshToken,
                        
                        TourCompleted = user.TourCompleted,
                        ItemsTourCompleted = user.ItemsTourCompleted,
                        NewItemTourCompleted = user.NewItemTourCompleted,
                        LearningTourCompleted = user.LearningTourCompleted
                    };
                }

                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}