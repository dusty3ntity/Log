using System;
using System.Threading.Tasks;
using Application.Dictionaries;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DictionariesController : BaseController
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<DictionaryDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query {Id = id});
        }
    }
}