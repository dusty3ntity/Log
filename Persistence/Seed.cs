using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            List<AppUser> users = new List<AppUser>();

            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Kek",
                    UserName = "kek",
                    Email = "kek@ohyr.dev"
                };

                await userManager.CreateAsync(user, "123asd123");
                users.Add(user);
            }

            if (!context.Dictionaries.Any())
            {
                var languages = new List<Language>
                {
                    new Language
                    {
                        Name = "English",
                        ISOCode = "eng"
                    },
                    new Language
                    {
                        Name = "Русский",
                        ISOCode = "rus"
                    },
                    new Language
                    {
                        Name = "Українська",
                        ISOCode = "ukr"
                    },
                };

                var Item1 = new Item
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
                };

                var Item2 = new Item
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
                };

                var Item3 = new Item
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
                };

                var Item4 = new Item
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
                };

                var Item5 = new Item
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
                };

                var Item6 = new Item
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
                };

                var Item7 = new Item
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
                };

                var Item8 = new Item
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
                };

                var Item9 = new Item
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
                };

                var Item10 = new Item
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
                };

                var dictionary = new Dictionary
                {
                    User = users[0],
                    IsMain = true,
                    KnownLanguage = languages[1],
                    LanguageToLearn = languages[0],
                    PhrasesCount = 2,
                    WordsCount = 8,
                    LearnedWordsCount = 3,
                    LearnedPhrasesCount = 1,
                    PreferredLearningListSize = 50,
                    CorrectAnswersToItemCompletion = 5,
                    IsHardModeEnabled = true,
                    Items = new List<Item>
                    {
                        Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9, Item10
                    }
                };

                await context.Languages.AddRangeAsync(languages);
                await context.Dictionaries.AddAsync(dictionary);
                await context.SaveChangesAsync();
            }
        }
    }
}