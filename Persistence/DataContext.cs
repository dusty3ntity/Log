using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Dictionary> Dictionaries { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<LearningList> LearningLists { get; set; }
        public DbSet<LearningItem> LearningItems { get; set; }
        public DbSet<Language> Languages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            SetupDictionaries(builder);
            SetupLearningLists(builder);
            SetupItems(builder);

            SetupConversions(builder);
        }

        private static void SetupDictionaries(ModelBuilder builder)
        {
            builder.Entity<Dictionary>()
                .HasOne(d => d.LearningList)
                .WithOne(l => l.Dictionary)
                .HasForeignKey<LearningList>(l => l.DictionaryId);

            builder.Entity<Dictionary>()
                .HasMany(d => d.Items)
                .WithOne(i => i.Dictionary)
                .HasForeignKey(i => i.DictionaryId);


            builder.Entity<Dictionary>()
                .HasOne(d => d.KnownLanguage)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Dictionary>()
                .HasOne(d => d.LanguageToLearn)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
        }

        private static void SetupItems(ModelBuilder builder)
        {
            builder.Entity<Item>()
                .HasOne<LearningItem>()
                .WithOne(i => i.Item)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);
        }

        private static void SetupLearningLists(ModelBuilder builder)
        {
            builder.Entity<LearningList>()
                .HasMany(l => l.LearningItems)
                .WithOne(i => i.LearningList)
                .HasForeignKey(i => i.LearningListId);
        }

        private static void SetupConversions(ModelBuilder builder)
        {
            builder.Entity<Item>()
                .Property(i => i.Type)
                .HasConversion<string>();

            builder.Entity<LearningItem>()
                .Property(i => i.LearningMode)
                .HasConversion<string>();
        }
    }
}