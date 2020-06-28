using System;
using Domain;

namespace Application.LearningItems
{
    public class LearningItemDto
    {
        public Guid Id { get; set; }
        
        public LearningMode LearningMode { get; set; }
        public int NumberInSequence { get; set; }
        
        public TestItem Item { get; set; }
    }
}