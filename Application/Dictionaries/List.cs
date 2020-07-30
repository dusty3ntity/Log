using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dictionaries
{
    public class List
    {
        public class Query : IRequest<List<DictionaryDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<DictionaryDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<List<DictionaryDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var dictionaries = await _context.Dictionaries
                    .Where(d => d.UserId == user.Id)
                    .Include(d => d.KnownLanguage)
                    .Include(d => d.LanguageToLearn)
                    .Select(d => _mapper.Map<Dictionary, DictionaryDto>(d))
                    .ToListAsync();

                return dictionaries;
            }
        }
    }
}