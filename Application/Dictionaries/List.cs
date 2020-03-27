using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<DictionaryDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var dictionaries = await _context.Dictionaries
                    .Include(d => d.KnownLanguage)
                    .Include(d => d.LanguageToLearn)
                    .Select(d => _mapper.Map<Dictionary, DictionaryDto>(d))
                    .ToListAsync();

                return dictionaries;
            }
        }
    }
}