using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsDictionaryOwnerRequirement : IAuthorizationRequirement
    {
    }

    public class IsDictionaryOwnerRequirementHandler : AuthorizationHandler<IsDictionaryOwnerRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;

        public IsDictionaryOwnerRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = context;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            IsDictionaryOwnerRequirement requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims
                ?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = _context.Users.SingleOrDefaultAsync(u => u.UserName.Equals(currentUserName)).Result;

            var dictionaryId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues
                .SingleOrDefault(x => x.Key == "dictionaryId").Value.ToString());

            var dictionary = _context.Dictionaries.FindAsync(dictionaryId).Result;

            if (dictionary == null || dictionary.UserId.Equals(user.Id))
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}