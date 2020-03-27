using Domain;

namespace Application.Utilities
{
    public static class ItemChecker
    {
        public static bool AreEqual(string original, string translation)
        {
            return original.Contains(translation) || translation.Contains(original);
        }

        public static bool DoesDescriptionContainItem(string description, string original,
            string translation)
        {
            description = description.ToLower();
            return description.Contains(original) || description.Contains(translation);
        }
    }
}