using System.Threading.Tasks;
using Domain;

namespace Application.Interfaces
{
    public interface ILearningListRemover
    {
        Task Remove(LearningList learningList);
    }
}