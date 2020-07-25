using System;
using System.Collections.Generic;
using Domain;

namespace Persistence.SeedData
{
    public static class Items
    {
        public static List<Item> GetItemsList()
        {
            var result = new List<Item>
            {
                new Item
                {
                    Original = "house",
                    Translation = "дом",
                    Definition = "A building for human habitation.",
                    DefinitionOrigin = "Cambridge Dictionary",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectAnswersCount = 0,
                    TotalRepeatsCount = 0,
                    GoesForNextDay = false,
                    CorrectAnswersToCompletionCount = 3
                },
                new Item
                {
                    Original = "horse",
                    Translation = "лошадь",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = true,
                    Type = ItemType.Word,
                    CorrectAnswersCount = 1,
                    TotalRepeatsCount = 3,
                    GoesForNextDay = true
                },
                new Item
                {
                    Original = "thank you",
                    Translation = "спасибо",
                    Definition = "A polite expression used when acknowledging a gift, service, or compliment.",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    Type = ItemType.Phrase,
                    CorrectAnswersCount = 5,
                    TotalRepeatsCount = 5,
                    GoesForNextDay = false,
                    CorrectAnswersToCompletionCount = 5
                },
                new Item
                {
                    Original = "hospital",
                    Translation = "больница",
                    Definition = "An institution providing medical and surgical treatment and nursing care.",
                    DefinitionOrigin = "Cambridge Dictionary",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = true,
                    Type = ItemType.Word,
                    CorrectAnswersCount = 0,
                    TotalRepeatsCount = 0,
                    GoesForNextDay = true,
                    CorrectAnswersToCompletionCount = 2
                },
                new Item
                {
                    Original = "to spill",
                    Translation = "пролить",
                    Definition = "Cause (liquid) to flow over the edge of its container.",
                    DefinitionOrigin = "Cambridge Dictionary",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectAnswersCount = 10,
                    TotalRepeatsCount = 11,
                    GoesForNextDay = false,
                    CorrectAnswersToCompletionCount = 5
                },
                new Item
                {
                    Original = "extraordinary",
                    Translation = "необычайный",
                    Definition = "Very unusual or remarkable.",
                    DefinitionOrigin = "Cambridge Dictionary",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectAnswersCount = 1003,
                    TotalRepeatsCount = 1123,
                    GoesForNextDay = false,
                    CorrectAnswersToCompletionCount = 5
                },
                new Item
                {
                    Original = "what's up?",
                    Translation = "как дела?",
                    Definition =
                        "An annoying question that has replaced 'Hello' or 'Hi' as the most popular form of casual greeting.",
                    DefinitionOrigin = "Urban Dictionary",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = false,
                    Type = ItemType.Phrase,
                    CorrectAnswersCount = 13,
                    TotalRepeatsCount = 11333,
                    GoesForNextDay = false
                },
                new Item
                {
                    Original = "patient",
                    Translation = "терпеливый",
                    Definition =
                        "Able to accept or tolerate delays, problems, or suffering without becoming annoyed or anxious.",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectAnswersCount = 13333,
                    TotalRepeatsCount = 19333,
                    GoesForNextDay = false,
                    CorrectAnswersToCompletionCount = 4
                },
                new Item
                {
                    Original = "consequences",
                    Translation = "последствия",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectAnswersCount = 133,
                    TotalRepeatsCount = 133,
                    GoesForNextDay = false,
                    CorrectAnswersToCompletionCount = 5
                },
                new Item
                {
                    Original = "workshop",
                    Translation = "семинар",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = true,
                    Type = ItemType.Word,
                    CorrectAnswersCount = 12,
                    TotalRepeatsCount = 13,
                    GoesForNextDay = true,
                    CorrectAnswersToCompletionCount = 1
                },
            };

            return result;
        }
    }
}