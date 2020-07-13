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

            public string NativeLanguageCode { get; set; }
            public string LanguageToLearnCode { get; set; }
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

                RuleFor(u => u.NativeLanguageCode)
                    .Must(BeValidLangISOCode)
                    .WithMessage("Please specify a valid ISO 639-2 language code.");
                RuleFor(u => u.LanguageToLearnCode)
                    .Must(BeValidLangISOCode)
                    .WithMessage("Please specify a valid ISO 639-2 language code.")
                    .NotEqual(u => u.NativeLanguageCode);
            }

            private bool BeValidLangISOCode(string languageCode)
            {
                if (languageCode == null)
                    return false;
                if (languageCode.Length != 3)
                    return false;
                return languageCode.All(c => c >= 'a' && c <= 'z');
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

                var knownLanguage = await _context.Languages
                    .SingleOrDefaultAsync(l => l.ISOCode.Equals(request.NativeLanguageCode));
                var languageToLearn = await _context.Languages
                    .SingleOrDefaultAsync(l => l.ISOCode.Equals(request.LanguageToLearnCode));

                if (knownLanguage == null || languageToLearn == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.LanguageNotFound);

                var user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username,
                    Dictionaries = new List<Dictionary>
                    {
                        new Dictionary
                        {
                            IsMain = true,
                            KnownLanguage = knownLanguage,
                            LanguageToLearn = languageToLearn,

                            PreferredLearningListSize = 50,
                            CorrectAnswersToItemCompletion = 5,
                            IsHardModeEnabled = false,

                            Items = new List<Item>()
                        }
                    }
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        Username = user.UserName
                    };
                }

                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
            }
        }
    }
}