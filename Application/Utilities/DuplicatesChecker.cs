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

        public async Task<Dictionary> SearchForDuplicates(Language knownLanguage, Language languageToLearn)
        {
            var duplicate = await _context.Dictionaries
                .Where(d => d.KnownLanguageId == knownLanguage.Id
                            && d.LanguageToLearnId == languageToLearn.Id)
                .FirstOrDefaultAsync();

            return duplicate;
        }
    }
}