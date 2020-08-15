using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using Persistence;

namespace Application.LearningLists
{
    public class LearningListRemover : ILearningListRemover
    {
        private readonly DataContext _context;

        public LearningListRemover(DataContext context)
        {
            _context = context;
        }

        public async Task Remove(LearningList learningList)
        {
            _context.LearningItems.RemoveRange(learningList.LearningItems);
            _context.LearningLists.Remove(learningList);

            var success = await _context.SaveChangesAsync() > 0;

            if (!success)
                throw new RestException(HttpStatusCode.InternalServerError, ErrorType.SavingChangesError);
        }
    }
}