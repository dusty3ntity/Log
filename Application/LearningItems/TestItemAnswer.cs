using Domain;

namespace Application.LearningItems
{
    public class TestItemAnswer
    {
        public string Item { get; set; }
        public string Answer { get; set; }
        public string Definition { get; set; }
        public string DefinitionOrigin { get; set; }
        public ItemType Type { get; set; }

        public bool IsStarred { get; set; }
        public int CorrectAnswersCount { get; set; }
    }
}