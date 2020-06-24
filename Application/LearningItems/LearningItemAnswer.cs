using Application.Items;

namespace Application.LearningItems
{
    public class LearningItemAnswer
    {
        public bool IsAnswerCorrect { get; set; }
        public string UserAnswer { get; set; }
        public AnswerItem Item { get; set; }
    }
}