using System;
using Domain;

namespace Application.Items
{
    public class ItemDto
    {
        public Guid Id { get; set; }

        public string Original { get; set; }
        public string Translation { get; set; }
        public string Definition { get; set; }
        public string DefinitionOrigin { get; set; }
        public ItemType Type { get; set; }
        public DateTime CreationDate { get; set; }

        public bool Starred { get; set; }
        public bool Learned { get; set; }
        public int TotalRepeatsCount { get; set; }
        public int CorrectAnswersCount { get; set; }
    }
}