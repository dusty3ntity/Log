using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
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
        }
    }
}