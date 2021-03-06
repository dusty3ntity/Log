﻿using System;
using System.Threading.Tasks;
using Application.LearningItems;
using Application.LearningLists;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/dictionaries/{dictionaryId}/[controller]")]
    [Authorize(Policy = "IsDictionaryOwner")]
    public class LearningListController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<LearningListDto>> Create(Guid dictionaryId)
        {
            return await Mediator.Send(new Create.Command {DictionaryId = dictionaryId});
        }

        [HttpGet("{learningListId}/nextItem")]
        public async Task<ActionResult<LearningItemDto>> GetNext(Guid dictionaryId,
            Guid learningListId)
        {
            return await Mediator.Send(new GetNextItem.Query
                {DictionaryId = dictionaryId, LearningListId = learningListId});
        }

        [HttpPost("{learningListId}/nextItem")]
        public async Task<ActionResult<LearningItemResult>> CheckItem(Guid dictionaryId,
            Guid learningListId,
            CheckItem.Command command)
        {
            command.DictionaryId = dictionaryId;
            command.LearningListId = learningListId;
            return await Mediator.Send(command);
        }

        [HttpPost("{learningListId}/startOver")]
        public async Task<ActionResult<Unit>> StartOver(Guid dictionaryId, Guid learningListId)
        {
            return await Mediator.Send(new StartOver.Command
                {DictionaryId = dictionaryId, LearningListId = learningListId});
        }
    }
}