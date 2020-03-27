using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dictionaries
{
    public class Details
    {
        public class Query : IRequest<DictionaryDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, DictionaryDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<DictionaryDto> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries
                    .Where(d => d.Id == request.Id)
                    .Include(d => d.KnownLanguage)
                    .Include(d => d.LanguageToLearn)
                    .SingleOrDefaultAsync(d => d.Id == request.Id);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {dictionary = "Not found"});

                var dictionaryToReturn = _mapper.Map<Dictionary, DictionaryDto>(dictionary);

                return dictionaryToReturn;
            }
        }
    }
}