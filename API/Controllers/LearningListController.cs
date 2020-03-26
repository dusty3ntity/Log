using System;
using System.Threading.Tasks;
using Application.LearningItems;
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

        [HttpGet("{learningListId}/nextItem")]
        public async Task<ActionResult<LearningItemDto>> GetNext(Guid learningListId)
        {
            return await Mediator.Send(new GetNextItem.Query {LearningListId = learningListId});
        }

        [HttpPost("{learningListId}/nextItem")]
        public async Task<ActionResult<LearningItemAnswer>> CheckItem(Guid learningListId, CheckItem.Command command)
        {
            command.LearningListId = learningListId;
            return await Mediator.Send(command);
        }

        // For testing purposes, should be deleted soon
        [HttpDelete]
        public async Task<ActionResult<Unit>> Delete(Guid dictionaryId)
        {
            return await Mediator.Send(new Delete.Command {DictionaryId = dictionaryId});
        }
    }
}