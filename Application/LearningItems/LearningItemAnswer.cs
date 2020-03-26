using Application.Items;

namespace Application.LearningItems
{
    public class LearningItemAnswer
    {
        public bool IsAnswerCorrect { get; set; }
        public ItemDto Item { get; set; }
    }
}