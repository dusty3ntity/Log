using System;
using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
    public interface IDuplicatesChecker
    {
        Task<bool> IsDuplicate(Dictionary dictionary);
        Task<bool> IsDuplicate(Guid dictionaryId, Item item);
        Task<bool> IsDuplicate(Guid dictionaryId, string original, string translation);
    }
}