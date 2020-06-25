using Domain;

namespace Application.LearningItems
{
    public class TestItem
    {
        public string Item { get; set; }
        public string AnswerMask { get; set; }
        public char AnswerFirstLetter { get; set; }
        public string Definition { get; set; }
        public ItemType Type { get; set; }

        public bool IsStarred { get; set; }
        public bool IsLearned { get; set; }

        public double Complexity { get; set; }
        public int CorrectAnswersToCompletionCount { get; set; }
    }
}