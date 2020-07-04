using System;
using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
    public interface ILearningListGenerator
    {
        Task<LearningList> Generate(Guid dictionaryId, int preferredLearningListSize,
            int correctAnswersToItemCompletion, bool isHardModeActivated);
    }
}