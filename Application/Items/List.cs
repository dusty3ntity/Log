using System;
using System.Collections.Generic;
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

namespace Application.Items
{
    public class List
    {
        public class ItemsEnvelope
        {
            public List<ItemDto> Items { get; set; }
            public int ItemsCount { get; set; }
        }

        public class Query : IRequest<ItemsEnvelope>
        {
            public Query(Guid dictionaryId, int? limit, int? offset)
            {
                DictionaryId = dictionaryId;
                Limit = limit;
                Offset = offset;
            }

            public Guid DictionaryId { get; set; }

            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, ItemsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ItemsEnvelope> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.DictionaryNotFound);

                var queryable = _context.Items
					.Where(i => i.DictionaryId == request.DictionaryId)
					.OrderByDescending(i => i.CreationDate)
					.AsQueryable();

                var items = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 3).ToListAsync();

                return new ItemsEnvelope
                {
                    Items = _mapper.Map<List<Item>, List<ItemDto>>(items),
                    ItemsCount = queryable.Count()
                };
            }
        }
    }
}