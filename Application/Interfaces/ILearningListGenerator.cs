﻿using System;
using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
    public interface ILearningListGenerator
    {
        Task<LearningList> Generate(Guid dictionaryId);
    }
}