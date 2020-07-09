using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dictionaries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DictionariesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<DictionaryDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{dictionaryId}")]
        [Authorize(Policy = "IsDictionaryOwner")]
        public async Task<ActionResult<DictionaryDto>> Details(Guid dictionaryId)
        {
            return await Mediator.Send(new Details.Query {Id = dictionaryId});
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{dictionaryId}")]
        [Authorize(Policy = "IsDictionaryOwner")]
        public async Task<ActionResult<Unit>> Edit(Guid dictionaryId, Edit.Command command)
        {
            command.Id = dictionaryId;
            return await Mediator.Send(command);
        }

        [HttpDelete("{dictionaryId}")]
        [Authorize(Policy = "IsDictionaryOwner")]
        public async Task<ActionResult<Unit>> Delete(Guid dictionaryId)
        {
            return await Mediator.Send(new Delete.Command {Id = dictionaryId});
        }

        [HttpPost("{dictionaryId}/setMain")]
        [Authorize(Policy = "IsDictionaryOwner")]
        public async Task<ActionResult<Unit>> SetMain(Guid dictionaryId)
        {
            return await Mediator.Send(new SetMain.Command {Id = dictionaryId});
        }
    }
}