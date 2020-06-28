using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
    public interface IDuplicatesChecker
    {
        Task<Dictionary> SearchForDuplicates(Language knownLanguage, Language languageToLearn);
    }
}