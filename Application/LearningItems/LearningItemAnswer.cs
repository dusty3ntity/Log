using Domain;

namespace Application.LearningItems
{
    public class LearningItemAnswer
    {
        public bool AnswerCorrect { get; set; }
        public Item Item { get; set; }
    }
}