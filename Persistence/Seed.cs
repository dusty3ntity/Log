using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence.SeedData;

namespace Persistence
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            List<AppUser> users = new List<AppUser>();

            if (!context.Languages.Any())
            {
                await context.Languages.AddRangeAsync(Languages.GetLanguagesList());
            }

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


                var dictionary = new Dictionary
                {
                    User = users[0],
                    IsMain = true,
                    KnownLanguageId = 77,
                    LanguageToLearnId = 21,
                    PhrasesCount = 10,
                    WordsCount = 90,
                    LearnedWordsCount = 16,
                    LearnedPhrasesCount = 2,
                    StarredItemsCount = 21,
                    PreferredLearningListSize = 50,
                    CorrectAnswersToItemCompletion = 8,
                    IsHardModeEnabled = false,
                    Items = Items.GetItemsList()
                };

                await context.Dictionaries.AddAsync(dictionary);
                await context.SaveChangesAsync();
            }
        }
    }
}