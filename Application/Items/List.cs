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
        public class Query : IRequest<List<ItemDto>>
        {
            public Query(Guid dictionaryId, int? limit, int? offset, bool isLearned,
                bool isInProgress, bool isNoProgress, ItemType? type)
            {
                DictionaryId = dictionaryId;

                Limit = limit;
                Offset = offset;

                ItemType = type;

                IsLearned = isLearned;
                IsInProgress = isInProgress;
                IsNoProgress = isNoProgress;
            }

            public Guid DictionaryId { get; }

            public int? Limit { get; }
            public int? Offset { get; }

            public ItemType? ItemType { get; }

            public bool IsLearned { get; }
            public bool IsInProgress { get; }
            public bool IsNoProgress { get; }
        }

        public class Handler : IRequestHandler<Query, List<ItemDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ItemDto>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var dictionary = await _context.Dictionaries.FindAsync(request.DictionaryId);

                if (dictionary == null)
                    throw new RestException(HttpStatusCode.NotFound, ErrorType.DictionaryNotFound);

                var queryable = _context.Items
                    .Where(i => i.DictionaryId == request.DictionaryId)
                    .OrderByDescending(i => i.CreationDate)
                    .AsQueryable();

                if (request.ItemType != null)
                    queryable = queryable.Where(i => i.Type == request.ItemType);

                if (request.IsLearned || request.IsInProgress || request.IsNoProgress)
                {
                    queryable = queryable.Where(i => (request.IsLearned && i.IsLearned) ||
                                                     (request.IsInProgress && (i.CorrectAnswersToCompletionCount > 0 &&
                                                                               i.CorrectAnswersToCompletionCount <
                                                                               dictionary.CorrectAnswersToItemCompletion
                                                         )) ||
                                                     (request.IsNoProgress && i.CorrectAnswersToCompletionCount ==
                                                         0));
                }

                var items = await queryable.Skip(request.Offset ?? 0).Take(request.Limit ?? 20).ToListAsync();

                return _mapper.Map<List<Item>, List<ItemDto>>(items);
            }
        }
    }
}