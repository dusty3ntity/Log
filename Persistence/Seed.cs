using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Dictionaries.Any())
            {
                var Item1 = new Item
                {
                    Original = "house",
                    Translation = "дом",
                    Definition = "A building for human habitation",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectRepeatsCount = 0,
                    TotalRepeatsCount = 0,
                    GoesForNextDay = false
                };

                var Item2 = new Item
                {
                    Original = "horse",
                    Translation = "лошадь",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = true,
                    Type = ItemType.Word,
                    CorrectRepeatsCount = 1,
                    TotalRepeatsCount = 3,
                    GoesForNextDay = true
                };

                var Item3 = new Item
                {
                    Original = "thank you",
                    Translation = "спасибо",
                    Definition = "A polite expression used when acknowledging a gift, service, or compliment",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    Type = ItemType.Phrase,
                    CorrectRepeatsCount = 5,
                    TotalRepeatsCount = 5,
                    GoesForNextDay = false
                };

                var Item4 = new Item
                {
                    Original = "hospital",
                    Translation = "больница",
                    Definition = "An institution providing medical and surgical treatment and nursing care",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = true,
                    Type = ItemType.Word,
                    CorrectRepeatsCount = 0,
                    TotalRepeatsCount = 0,
                    GoesForNextDay = true
                };

                var Item5 = new Item
                {
                    Original = "to spill",
                    Translation = "пролить",
                    Definition = "Cause (liquid) to flow over the edge of its container",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectRepeatsCount = 10,
                    TotalRepeatsCount = 11,
                    GoesForNextDay = false
                };

                var Item6 = new Item
                {
                    Original = "a spillwwwwwwwwwwwwwwwwwwwwwww",
                    Translation = "пролитьффффффффффффффффффффффф",
                    Definition = "Having a great deal to do very long description very long description very long description very lon",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectRepeatsCount = 1003,
                    TotalRepeatsCount = 1123,
                    GoesForNextDay = false
                };
                
                var Item7 = new Item
                {
                    Original = "a spillwwwwwww wwwwwwwwwwwwwww",
                    Translation = "пролить",
                    Definition = "Having a great deal to do very long description very long description very long description very lon",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = false,
                    Type = ItemType.Phrase,
                    CorrectRepeatsCount = 13,
                    TotalRepeatsCount = 11333,
                    GoesForNextDay = false
                };
                
                var Item8 = new Item
                {
                    Original = "abkfjdf",
                    Translation = "пролитьффффффффффффффффффффффф",
                    Definition = "Having a great deal to do very long description very long description very long description very lon",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectRepeatsCount = 13333,
                    TotalRepeatsCount = 19333,
                    GoesForNextDay = false
                };
                
                var Item9 = new Item
                {
                    Original = "abkfjwwwwwwwwwwwwwwwwwwwwwwwww",
                    Translation = "пролитьффффффффффффффффффффффф",
                    Definition = "Having a great deal to do very long description very long description very long description very lon",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    Type = ItemType.Word,
                    CorrectRepeatsCount = 133,
                    TotalRepeatsCount = 133,
                    GoesForNextDay = false
                };

                var dictionary = new Dictionary
                {
                    IsMain = true,
                    KnownLanguage = new Language
                    {
                        Name = "Русский",
                        ISOCode = "ru"
                    },
                    LanguageToLearn = new Language
                    {
                        Name = "English",
                        ISOCode = "en"
                    },
                    PhrasesCount = 2,
                    WordsCount = 7,
                    LearnedItemsCount = 4,
                    PreferredLearningListSize = 50,
                    Items = new List<Item>
                    {
                        Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8, Item9
                    },
                    LearningList = new LearningList
                    {
                        CreationDate = DateTime.Now - TimeSpan.FromDays(2),
                        Size = 6,
                        CompletedItemsCount = 0,
                        LearningItems = new List<LearningItem>
                        {
                            new LearningItem
                            {
                                LearningMode = LearningMode.Primary,
                                NumberInSequence = 0,
                                Item = Item6
                            },
                            new LearningItem
                            {
                                LearningMode = LearningMode.Secondary,
                                NumberInSequence = 1,
                                Item = Item1
                            },
                            new LearningItem
                            {
                                LearningMode = LearningMode.Primary,
                                NumberInSequence = 2,
                                Item = Item9
                            },
                            new LearningItem
                            {
                                LearningMode = LearningMode.Primary,
                                NumberInSequence = 3,
                                Item = Item2
                            },
                            new LearningItem
                            {
                                LearningMode = LearningMode.Primary,
                                NumberInSequence = 4,
                                Item = Item7
                            },
                            new LearningItem
                            {
                                LearningMode = LearningMode.Primary,
                                NumberInSequence = 5,
                                Item = Item8
                            }
                        }
                    }
                };

                await context.Dictionaries.AddAsync(dictionary);
                await context.SaveChangesAsync();
            }
        }
    }
}