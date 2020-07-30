using Domain;

namespace Application.Utilities
{
    public static class ItemChecker
    {
        public static bool AreEqual(string original, string translation)
        {
            return original.Contains(translation) || translation.Contains(original);
        }

        public static bool DoesDefinitionContainItem(string definition, string original,
            string translation)
        {
            definition = definition.ToLower();
            return definition.Contains(original) || definition.Contains(translation);
        }
    }
}