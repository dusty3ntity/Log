using System;
using System.Threading.Tasks;
using Application.LearningLists;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/dictionaries/{dictionaryId}/[controller]")]
    public class LearningListController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Guid>> Create(Guid dictionaryId)
        {
            return await Mediator.Send(new Create.Command {DictionaryId = dictionaryId});
        }

        [HttpDelete]
        public async Task<ActionResult<Unit>> Delete(Guid dictionaryId)
        {
            return await Mediator.Send(new Delete.Command {DictionaryId = dictionaryId});
        }
    }
}