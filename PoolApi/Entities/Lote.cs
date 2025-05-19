using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoolApi.Entities
{
    public class Lote
    {
        public int Id { get; set; }
        public required string NumeroLote { get; set; }
        public decimal Precio { get; set; }
        public DateTime FechaIngreso { get; set; }
        public int Cantidad { get; set; }

        public int ProductId { get; set; }

        public Producto? Producto { get; set; }

    }
}
