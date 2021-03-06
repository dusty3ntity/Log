﻿using System;
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
using Persistence;

namespace Application.Users
{
    public class RefreshToken
    {
        public class Query : IRequest<User>
        {
            public string Username { get; set; }
            public string Token { get; set; }
            public string RefreshToken { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Token).NotEmpty();
                RuleFor(x => x.RefreshToken).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.DefaultValidationError);

                if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiry < DateTime.Now)
                    throw new RestException(HttpStatusCode.Unauthorized, ErrorType.RefreshTokenExpired);

                user.RefreshToken = _jwtGenerator.GenerateRefreshToken();
                user.RefreshTokenExpiry = DateTime.Now.AddDays(30);
                await _userManager.UpdateAsync(user);

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
        }
    }
}