using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dictionaries;
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
    }
}