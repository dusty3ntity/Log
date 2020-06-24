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
        public int CorrectAnswersCount { get; set; }
    }
}