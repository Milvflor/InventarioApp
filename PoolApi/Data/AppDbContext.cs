using PoolApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace PoolApi.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<Lote> Lotes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>().HasMany(p => p.Lotes).WithOne(l => l.Producto).HasForeignKey(l => l.ProductId);
            modelBuilder.Entity<Lote>(l => { l.Property(e => e.Precio).HasColumnType("decimal(18,3)"); });
        }
    }
}