using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces
{
    public interface ILearningListRemover
    {
        Task Remove(Dictionary dictionary);
    }
}