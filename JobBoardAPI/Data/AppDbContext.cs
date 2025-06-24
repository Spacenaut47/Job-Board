using Microsoft.EntityFrameworkCore;
using JobBoardAPI.Models;

namespace JobBoardAPI.Data;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Job> Jobs { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Job>()
            .Property(j => j.Languages)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
            );
    }
}
