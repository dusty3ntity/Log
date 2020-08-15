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
                    Original = "actually",
                    Translation = "вообще-то",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 1,
                    TotalRepeatsCount = 3,
                    CorrectAnswersToCompletionCount = 7,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "ambush",
                    Translation = "засада",
                    Type = ItemType.Word,
                    Definition = "A surprise attack by people lying in wait in a concealed position.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 15,
                    TotalRepeatsCount = 74,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "attorney",
                    Translation = "адвокат",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 17,
                    TotalRepeatsCount = 31,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "best",
                    Translation = "лучший",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 48,
                    TotalRepeatsCount = 87,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "but",
                    Translation = "но",
                    Type = ItemType.Word,
                    Definition =
                        "Used to introduce a phrase or clause contrasting with what has already been mentioned.",
                    DefinitionOrigin = "Oxford Dictionary",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 44,
                    TotalRepeatsCount = 72,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "by the by",
                    Translation = "кстати",
                    Type = ItemType.Phrase,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 10,
                    TotalRepeatsCount = 15,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-1),
                    LearnedRepeatsCount = 3,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "calendar",
                    Translation = "календарь",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 31,
                    TotalRepeatsCount = 98,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "clock",
                    Translation = "часы",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 8,
                    TotalRepeatsCount = 61,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "court",
                    Translation = "суд",
                    Type = ItemType.Word,
                    Definition =
                        "A tribunal presided over by a judge, judges, or a magistrate in civil and criminal cases.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 17,
                    TotalRepeatsCount = 32,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-2),
                    LearnedRepeatsCount = 2,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "dark",
                    Translation = "темный",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 2,
                    TotalRepeatsCount = 79,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "different",
                    Translation = "разные",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 3,
                    TotalRepeatsCount = 6,
                    CorrectAnswersToCompletionCount = 7,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "difficult",
                    Translation = "сложный",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 11,
                    TotalRepeatsCount = 57,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "emperor",
                    Translation = "император",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 9,
                    TotalRepeatsCount = 38,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "excuse me",
                    Translation = "простите",
                    Type = ItemType.Phrase,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 16,
                    TotalRepeatsCount = 20,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "exhausted",
                    Translation = "истощён",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 1,
                    TotalRepeatsCount = 4,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "first",
                    Translation = "первый",
                    Type = ItemType.Word,
                    Definition = "Coming before all others in time or order.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 54,
                    TotalRepeatsCount = 76,
                    CorrectAnswersToCompletionCount = 6,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "fish",
                    Translation = "рыба",
                    Type = ItemType.Word,
                    Definition =
                        "A limbless cold-blooded vertebrate animal with gills and fins and living wholly in water.",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 0,
                    TotalRepeatsCount = 1,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "flavor",
                    Translation = "аромат",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 2,
                    TotalRepeatsCount = 21,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "ginger",
                    Translation = "имбирь",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 0,
                    TotalRepeatsCount = 54,
                    CorrectAnswersToCompletionCount = 7,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "green",
                    Translation = "зелёный",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 44,
                    TotalRepeatsCount = 44,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-12),
                    LearnedRepeatsCount = 11,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "happy",
                    Translation = "счастливый",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 73,
                    TotalRepeatsCount = 98,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "hazy",
                    Translation = "туманный",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 29,
                    TotalRepeatsCount = 81,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-1),
                    LearnedRepeatsCount = 2,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "hour",
                    Translation = "час",
                    Type = ItemType.Word,
                    Definition =
                        "A period of time equal to a twenty-fourth part of a day and night and divided into 60 minutes.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 3,
                    TotalRepeatsCount = 8,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "house",
                    Translation = "дом",
                    Type = ItemType.Word,
                    Definition = "A building for human habitation.",
                    DefinitionOrigin = "Cambridge Dictionary",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 39,
                    TotalRepeatsCount = 49,
                    CorrectAnswersToCompletionCount = 7,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "huge",
                    Translation = "огромный",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 3,
                    TotalRepeatsCount = 43,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "hungry",
                    Translation = "голоден",
                    Type = ItemType.Word,
                    Definition = "Feeling or displaying the need for food.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 32,
                    TotalRepeatsCount = 33,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-1),
                    LearnedRepeatsCount = 7,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "idea",
                    Translation = "идея",
                    Type = ItemType.Word,
                    Definition = "A thought or suggestion as to a possible course of action.",
                    DefinitionOrigin = "Cambridge Dictionary",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 0,
                    TotalRepeatsCount = 8,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "I'm starving",
                    Translation = "я голодаю",
                    Type = ItemType.Phrase,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 23,
                    TotalRepeatsCount = 25,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "important",
                    Translation = "важный",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 27,
                    TotalRepeatsCount = 57,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "jealous",
                    Translation = "ревнивый",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 58,
                    TotalRepeatsCount = 65,
                    CorrectAnswersToCompletionCount = 7,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "kind",
                    Translation = "добрый",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 56,
                    TotalRepeatsCount = 75,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "long",
                    Translation = "длинный",
                    Type = ItemType.Word,
                    Definition = "Measuring a great distance from end to end.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 20,
                    TotalRepeatsCount = 22,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "love",
                    Translation = "любовь",
                    Type = ItemType.Word,
                    Definition = "An intense feeling of deep affection.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 77,
                    TotalRepeatsCount = 88,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "meat",
                    Translation = "мясо",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 1,
                    TotalRepeatsCount = 17,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "minute",
                    Translation = "минута",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 25,
                    TotalRepeatsCount = 35,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "more",
                    Translation = "больше",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 22,
                    TotalRepeatsCount = 30,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-14),
                    LearnedRepeatsCount = 3,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "my pleasure",
                    Translation = "с удовольствием",
                    Type = ItemType.Phrase,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 8,
                    TotalRepeatsCount = 28,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "necessary",
                    Translation = "необходимый",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 8,
                    TotalRepeatsCount = 12,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-1),
                    LearnedRepeatsCount = 1,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "never mind",
                    Translation = "не обращай внимания",
                    Type = ItemType.Phrase,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 6,
                    TotalRepeatsCount = 38,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "nice to meet you",
                    Translation = "рад встрече",
                    Type = ItemType.Phrase,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 47,
                    TotalRepeatsCount = 94,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "no doubt",
                    Translation = "без сомнения",
                    Type = ItemType.Phrase,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 14,
                    TotalRepeatsCount = 80,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "number",
                    Translation = "номер",
                    Type = ItemType.Word,
                    Definition =
                        "An arithmetical value, expressed by a word, symbol, or figure, representing a particular quantity.",
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 6,
                    TotalRepeatsCount = 8,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "ointment",
                    Translation = "мазь",
                    Type = ItemType.Word,
                    Definition =
                        "A smooth oily preparation that is rubbed on the skin for medicinal purposes or as a cosmetic.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 44,
                    TotalRepeatsCount = 78,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-1),
                    LearnedRepeatsCount = 2,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "people",
                    Translation = "люди",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 10,
                    TotalRepeatsCount = 11,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-4),
                    LearnedRepeatsCount = 2,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "phrase",
                    Translation = "фраза",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 10,
                    TotalRepeatsCount = 44,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "precisely",
                    Translation = "точно",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 32,
                    TotalRepeatsCount = 80,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "principal",
                    Translation = "директор школы",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 8,
                    TotalRepeatsCount = 8,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-10),
                    LearnedRepeatsCount = 1,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "probation",
                    Translation = "испытательный срок",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 18,
                    TotalRepeatsCount = 80,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "rare",
                    Translation = "редкостный",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 25,
                    TotalRepeatsCount = 66,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "reckless",
                    Translation = "безрассудный",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 18,
                    TotalRepeatsCount = 43,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "science",
                    Translation = "наука",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 1,
                    TotalRepeatsCount = 3,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "selfish",
                    Translation = "эгоистичный",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 29,
                    TotalRepeatsCount = 52,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "sentence",
                    Translation = "приговор",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 27,
                    TotalRepeatsCount = 69,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "strong",
                    Translation = "сильный",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 59,
                    TotalRepeatsCount = 74,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "suspect",
                    Translation = "подозреваемый",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 11,
                    TotalRepeatsCount = 48,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "tall",
                    Translation = "высокий",
                    Type = ItemType.Word,
                    Definition = "Of great or more than average height.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 16,
                    TotalRepeatsCount = 37,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "thank you",
                    Translation = "спасибо",
                    Type = ItemType.Phrase,
                    Definition = "A polite expression used when acknowledging a gift, service, or compliment.",
                    DefinitionOrigin = "Oxford Dictionary",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 17,
                    TotalRepeatsCount = 34,
                    CorrectAnswersToCompletionCount = 6,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "time",
                    Translation = "время",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 61,
                    TotalRepeatsCount = 82,
                    CorrectAnswersToCompletionCount = 6,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to beg",
                    Translation = "умолять",
                    Type = ItemType.Word,
                    Definition = "Ask for something, typically food or money, as charity or a gift.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 15,
                    TotalRepeatsCount = 56,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to blame",
                    Translation = "винить",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 9,
                    TotalRepeatsCount = 11,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to come",
                    Translation = "приходить",
                    Type = ItemType.Word,
                    Definition = "Move or travel toward or into a place thought of as near or familiar to the speaker.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 31,
                    TotalRepeatsCount = 95,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to desire",
                    Translation = "желать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 54,
                    TotalRepeatsCount = 89,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to do",
                    Translation = "делать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 12,
                    TotalRepeatsCount = 66,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to draw",
                    Translation = "рисовать",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 0,
                    TotalRepeatsCount = 80,
                    CorrectAnswersToCompletionCount = 7,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to eat",
                    Translation = "есть",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 32,
                    TotalRepeatsCount = 100,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-3),
                    LearnedRepeatsCount = 20,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to eavesdrop",
                    Translation = "подслушивать",
                    Type = ItemType.Word,
                    Definition = "Secretly listen to a conversation.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 22,
                    TotalRepeatsCount = 23,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-5),
                    LearnedRepeatsCount = 4,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to have",
                    Translation = "иметь",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 4,
                    TotalRepeatsCount = 5,
                    CorrectAnswersToCompletionCount = 7,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to help",
                    Translation = "помогать",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 54,
                    TotalRepeatsCount = 90,
                    CorrectAnswersToCompletionCount = 6,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to laugh",
                    Translation = "смеяться",
                    Type = ItemType.Word,
                    Definition =
                        "Make spontaneous sounds and movements of the face and body that are the expressions of amusement.",
                    DefinitionOrigin = "Cambridge Dictionary",
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 25,
                    TotalRepeatsCount = 53,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-5),
                    LearnedRepeatsCount = 1,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to like",
                    Translation = "нравиться",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 42,
                    TotalRepeatsCount = 60,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-20),
                    LearnedRepeatsCount = 3,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to look",
                    Translation = "смотреть",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 10,
                    TotalRepeatsCount = 13,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to obey",
                    Translation = "подчиняться",
                    Type = ItemType.Word,
                    Definition =
                        "Comply with the command, direction, or request of (a person or a law); submit to the authority of.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 1,
                    TotalRepeatsCount = 4,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to open",
                    Translation = "открывать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 9,
                    TotalRepeatsCount = 78,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to oppose",
                    Translation = "выступать против",
                    Type = ItemType.Word,
                    Definition = "Disapprove of and attempt to prevent, especially by argument.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 57,
                    TotalRepeatsCount = 67,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to overlook",
                    Translation = "игнорировать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 41,
                    TotalRepeatsCount = 47,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to read",
                    Translation = "читать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 9,
                    TotalRepeatsCount = 44,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to smoke",
                    Translation = "курить",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 9,
                    TotalRepeatsCount = 44,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to say",
                    Translation = "сказать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 27,
                    TotalRepeatsCount = 69,
                    CorrectAnswersToCompletionCount = 3,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to sue",
                    Translation = "судить",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 7,
                    TotalRepeatsCount = 13,
                    CorrectAnswersToCompletionCount = 6,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to talk",
                    Translation = "говорить",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 12,
                    TotalRepeatsCount = 15,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to understand",
                    Translation = "понимать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 4,
                    TotalRepeatsCount = 9,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to use",
                    Translation = "использовать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 8,
                    TotalRepeatsCount = 8,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-20),
                    LearnedRepeatsCount = 10,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to work",
                    Translation = "работать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 12,
                    TotalRepeatsCount = 34,
                    CorrectAnswersToCompletionCount = 1,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "to write",
                    Translation = "писать",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 14,
                    TotalRepeatsCount = 50,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "today",
                    Translation = "сегодня",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 1,
                    TotalRepeatsCount = 3,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "traitor",
                    Translation = "предатель",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 10,
                    TotalRepeatsCount = 19,
                    CorrectAnswersToCompletionCount = 6,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "true",
                    Translation = "верно",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 27,
                    TotalRepeatsCount = 52,
                    CorrectAnswersToCompletionCount = 0,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "trump card",
                    Translation = "козырная карта",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 2,
                    TotalRepeatsCount = 24,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "ugly",
                    Translation = "уродливый",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 15,
                    TotalRepeatsCount = 16,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-8),
                    LearnedRepeatsCount = 4,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "urgent",
                    Translation = "срочный",
                    Type = ItemType.Word,
                    IsStarred = true,
                    IsLearned = false,
                    CorrectAnswersCount = 28,
                    TotalRepeatsCount = 42,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "villain",
                    Translation = "злодей",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 6,
                    TotalRepeatsCount = 46,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "warm",
                    Translation = "теплый",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 27,
                    TotalRepeatsCount = 65,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "water",
                    Translation = "вода",
                    Type = ItemType.Word,
                    Definition = "A colorless, transparent liquid that forms the seas, lakes, rivers, and rain.",
                    DefinitionOrigin = "Google Translate",
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 0,
                    TotalRepeatsCount = 1,
                    CorrectAnswersToCompletionCount = 6,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "what's up?",
                    Translation = "как дела?",
                    Type = ItemType.Phrase,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 25,
                    TotalRepeatsCount = 87,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "wisdom",
                    Translation = "мудрость",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 4,
                    TotalRepeatsCount = 7,
                    CorrectAnswersToCompletionCount = 5,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "word",
                    Translation = "слово",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 9,
                    TotalRepeatsCount = 37,
                    CorrectAnswersToCompletionCount = 4,
                    GoesForNextDay = false,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "wrong",
                    Translation = "неверный",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 1,
                    TotalRepeatsCount = 6,
                    CorrectAnswersToCompletionCount = 7,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "you",
                    Translation = "ты",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 16,
                    TotalRepeatsCount = 23,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-1),
                    LearnedRepeatsCount = 1,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "you are being an inconvenience",
                    Translation = "вы доставляете неудобства",
                    Type = ItemType.Phrase,
                    IsStarred = false,
                    IsLearned = true,
                    CorrectAnswersCount = 31,
                    TotalRepeatsCount = 37,
                    CorrectAnswersToCompletionCount = 8,
                    GoesForNextDay = false,
                    LastLearnedRepeatDate = DateTime.Now.AddDays(-7),
                    LearnedRepeatsCount = 1,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
                new Item
                {
                    Original = "young",
                    Translation = "молодой",
                    Type = ItemType.Word,
                    IsStarred = false,
                    IsLearned = false,
                    CorrectAnswersCount = 32,
                    TotalRepeatsCount = 48,
                    CorrectAnswersToCompletionCount = 2,
                    GoesForNextDay = true,
                    CreationDate = DateTime.Now.AddDays(-30)
                },
            };

            return result;
        }
    }
}