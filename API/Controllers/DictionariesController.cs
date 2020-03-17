using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dictionaries;
using MediatR;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<DictionaryDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query {Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command {Id = id});
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Unit>> SetMain(Guid id)
        {
            return await Mediator.Send(new SetMain.Command {Id = id});
        }
    }
}