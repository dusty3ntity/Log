﻿using System;
using Domain;

namespace Application.Items
{
    public class ItemDto
    {
        public Guid Id { get; set; }

        public string Original { get; set; }
        public string Translation { get; set; }
        public string Definition { get; set; }
        public string DefinitionOrigin { get; set; }
        public ItemType Type { get; set; }
        public DateTime CreationDate { get; set; }

        public bool IsStarred { get; set; }
        public bool IsLearned { get; set; }

        public int TotalRepeatsCount { get; set; }
        public int CorrectAnswersCount { get; set; }
        public int CorrectAnswersToCompletionCount { get; set; }
    }
}