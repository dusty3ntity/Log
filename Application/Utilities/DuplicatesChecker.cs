using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Utilities
{
    public class DuplicatesChecker : IDuplicatesChecker
    {
        private readonly DataContext _context;

        public DuplicatesChecker(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> IsDuplicate(Dictionary dictionary)
        {
            var duplicate = await _context.Dictionaries
                .Where(d => d.KnownLanguageId == dictionary.KnownLanguage.Id
                            && d.LanguageToLearnId == dictionary.LanguageToLearn.Id)
                .FirstOrDefaultAsync();

            return duplicate != null;
        }

        public async Task<bool> IsDuplicate(Guid dictionaryId, Item item)
        {
            var duplicate = await _context.Items
                .Where(i => i.DictionaryId == dictionaryId
                            && i.Original.Equals(item.Original)
                            && i.Translation.Equals(item.Translation))
                .FirstOrDefaultAsync();

            return duplicate != null;
        }

        public async Task<bool> IsDuplicate(Guid dictionaryId, string original, string translation)
        {
            var duplicate = await _context.Items
                .Where(i => i.DictionaryId == dictionaryId
                            && i.Original.Equals(original)
                            && i.Translation.Equals(translation))
                .FirstOrDefaultAsync();

            return duplicate != null;
        }
    }
}