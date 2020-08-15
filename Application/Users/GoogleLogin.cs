using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users
{
    public class GoogleLogin
    {
        public class Query : IRequest<User>
        {
            public string AccessCode { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IGoogleAccessor _googleAccessor;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUser> userManager, IGoogleAccessor googleAccessor,
                IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _googleAccessor = googleAccessor;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var userInfo = await _googleAccessor.GoogleLogin(request.AccessCode);

                if (userInfo == null)
                    throw new RestException(HttpStatusCode.Unauthorized, ErrorType.GoogleAuthorizationFailed);

                var user = await _userManager.FindByEmailAsync(userInfo.Email);

                if (user != null && !user.UserName.Contains("_gg"))
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.DuplicateEmailFound);

                if (user == null)
                {
                    user = new AppUser
                    {
                        Id = userInfo.Sub,
                        DisplayName = userInfo.Name,
                        Email = userInfo.Email,
                        UserName = userInfo.Email.Split("@")[0] + "_gg",

                        Avatar = userInfo.Picture,

                        RefreshToken = _jwtGenerator.GenerateRefreshToken(),
                        RefreshTokenExpiry = DateTime.Now.AddDays(30),
                    };

                    var result = await _userManager.CreateAsync(user);

                    if (!result.Succeeded)
                        throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
                }

                return new User
                {
                    DisplayName = user.DisplayName,
                    Email = user.Email,
                    Username = user.UserName,

                    Avatar = user.Avatar,

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