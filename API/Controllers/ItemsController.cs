using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Items;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/dictionaries/{dictionaryId}/[controller]")]
    public class ItemsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> List(Guid dictionaryId)
        {
            return await Mediator.Send(new List.Query {DictionaryId = dictionaryId});
        }

        [HttpGet("{itemId}")]
        public async Task<ActionResult<Item>> Details(Guid dictionaryId, Guid itemId)
        {
            return await Mediator.Send(new Details.Query
                {DictionaryId = dictionaryId, ItemId = itemId});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command, Guid dictionaryId)
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
    }
}