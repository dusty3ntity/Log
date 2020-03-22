using System;
using Domain;

namespace Application.Utilities
{
    public static class DateChecker
    {
        public static bool IsLearningListOutdated(LearningList learningList)
        {
            var creationDate = learningList.CreationDate;
            var now = DateTime.Now;

            if (creationDate.Day == now.Day)
                return false;
            return true;
        }
    }
}