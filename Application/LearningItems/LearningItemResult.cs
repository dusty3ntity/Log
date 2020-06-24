using Application.Items;

namespace Application.LearningItems
{
    public class LearningItemResult
    {
        public bool IsAnswerCorrect { get; set; }
        public string UserAnswer { get; set; }
        public TestItemAnswer Item { get; set; }
    }
}