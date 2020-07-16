using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Items;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/dictionaries/{dictionaryId}/[controller]")]
    [Authorize(Policy = "IsDictionaryOwner")]
    public class ItemsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<ItemDto>>> List(Guid dictionaryId, int? limit, int? offset, bool words,
            bool phrases, bool learned, bool inProgress, bool noProgress, string search)
        {
            return await Mediator.Send(new List.Query(dictionaryId, limit, offset, words, phrases, learned, inProgress,
                noProgress, search));
        }

        [HttpGet("{itemId}")]
        public async Task<ActionResult<ItemDto>> Details(Guid dictionaryId, Guid itemId)
        {
            return await Mediator.Send(new Details.Query
                {DictionaryId = dictionaryId, ItemId = itemId});
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(Create.Command command, Guid dictionaryId)
        {
            command.DictionaryId = dictionaryId;
            return await Mediator.Send(command);
        }

        [HttpPut("{itemId}")]
        public async Task<ActionResult<Unit>> Edit(Guid dictionaryId, Guid itemId,
            Edit.Command command)
        {
            command.DictionaryId = dictionaryId;
            command.ItemId = itemId;
            return await Mediator.Send(command);
        }

        [HttpDelete("{itemId}")]
        public async Task<ActionResult<Unit>> Delete(Guid dictionaryId, Guid itemId)
        {
            return await Mediator.Send(new Delete.Command
                {DictionaryId = dictionaryId, ItemId = itemId});
        }

        [HttpPost("{itemId}/star")]
        public async Task<ActionResult<Unit>> Star(Guid dictionaryId, Guid itemId)
        {
            return await Mediator.Send(new Star.Command
                {DictionaryId = dictionaryId, ItemId = itemId});
        }

        [HttpPost("{itemId}/unstar")]
        public async Task<ActionResult<Unit>> Unstar(Guid dictionaryId, Guid itemId)
        {
            return await Mediator.Send(new Unstar.Command
                {DictionaryId = dictionaryId, ItemId = itemId});
        }
    }
}