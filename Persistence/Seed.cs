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
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = false,
                    ItemType = ItemType.Word,
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
                    ItemType = ItemType.Word,
                    CorrectRepeatsCount = 1,
                    TotalRepeatsCount = 3,
                    GoesForNextDay = true
                };

                var Item3 = new Item
                {
                    Original = "thank you",
                    Translation = "спасибо",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    ItemType = ItemType.Phrase,
                    CorrectRepeatsCount = 5,
                    TotalRepeatsCount = 5,
                    GoesForNextDay = false
                };

                var Item4 = new Item
                {
                    Original = "hospital",
                    Translation = "больница",
                    CreationDate = DateTime.Now,
                    IsLearned = false,
                    IsStarred = true,
                    ItemType = ItemType.Word,
                    CorrectRepeatsCount = 0,
                    TotalRepeatsCount = 0,
                    GoesForNextDay = true
                };

                var Item5 = new Item
                {
                    Original = "to care about",
                    Translation = "заботиться о",
                    CreationDate = DateTime.Now,
                    IsLearned = true,
                    IsStarred = false,
                    ItemType = ItemType.Phrase,
                    CorrectRepeatsCount = 10,
                    TotalRepeatsCount = 11,
                    GoesForNextDay = false
                };

                var dictionary = new Dictionary
                {
                    Name = "dict1",
                    KnownLanguage = new Language
                    {
                        Name = "Russian",
                        ISOCode = "ru"
                    },
                    LanguageToLearn = new Language
                    {
                        Name = "English",
                        ISOCode = "en"
                    },
                    PhrasesCount = 2,
                    WordsCount = 3,
                    LearnedItemsCount = 0,
                    PreferredLearningListSize = 50,
                    Items = new List<Item>
                    {
                        Item1, Item2, Item3, Item4, Item5
                    },
                    LearningList = new LearningList
                    {
                        Size = 5,
                        CompletedItemsCount = 0,
                        LearningItems = new List<LearningItem>
                        {
                            new LearningItem
                            {
                                LearningMode = LearningMode.Primary,
                                NumberInSequence = 0,
                                Item = Item1
                            },
                            new LearningItem
                            {
                                LearningMode = LearningMode.Secondary,
                                NumberInSequence = 1,
                                Item = Item2
                            },
                            new LearningItem
                            {
                                LearningMode = LearningMode.Primary,
                                NumberInSequence = 2,
                                Item = Item3
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