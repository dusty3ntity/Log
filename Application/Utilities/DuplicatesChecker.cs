using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;

namespace Application.Utilities
{
    public static class DuplicatesChecker
    {
        public static Dictionary SearchForDuplicates(List<Dictionary> dictionaries, Language knownLanguage,
            Language languageToLearn)
        {
            foreach (var dictionary in dictionaries)
                if (dictionary.KnownLanguageId == knownLanguage.Id &&
                    dictionary.LanguageToLearnId == languageToLearn.Id)
                    return dictionary;

            return null;
        }
    }
}