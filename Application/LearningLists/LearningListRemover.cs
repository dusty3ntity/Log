using System;
using System.Threading.Tasks;
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

        public async Task Remove(Dictionary dictionary)
        {
            _context.LearningItems.RemoveRange(dictionary.LearningList.LearningItems);
            _context.LearningLists.Remove(dictionary.LearningList);
            dictionary.LearningList = null;

            var success = await _context.SaveChangesAsync() > 0;

            if (!success)
                throw new Exception("Problem removing learning list");
        }
    }
}