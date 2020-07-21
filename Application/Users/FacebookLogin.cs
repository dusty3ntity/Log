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
    public class FacebookLogin
    {
        public class Query : IRequest<User>
        {
            public string AccessToken { get; set; }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IFacebookAccessor _facebookAccessor;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUser> userManager, IFacebookAccessor facebookAccessor,
                IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _facebookAccessor = facebookAccessor;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var userInfo = await _facebookAccessor.FacebookLogin(request.AccessToken);

                if (userInfo == null)
                    throw new RestException(HttpStatusCode.Unauthorized, ErrorType.FacebookAuthorizationFailed);

                var user = await _userManager.FindByEmailAsync(userInfo.Email);

                if (user != null && !user.UserName.Contains("_fb"))
                    throw new RestException(HttpStatusCode.BadRequest, ErrorType.DuplicateEmailFound);

                if (user == null)
                {
                    user = new AppUser
                    {
                        DisplayName = userInfo.Name,
                        Id = userInfo.Id,
                        Email = userInfo.Email,
                        UserName = userInfo.Email.Split("@")[0] + "_fb",
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
                    Token = _jwtGenerator.CreateToken(user),
                    RefreshToken = user.RefreshToken
                };
            }
        }
    }
}