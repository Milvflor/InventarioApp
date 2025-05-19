using System;

public class LoteConProductoDto
{
    public int Id { get; set; }
    public string NumeroLote { get; set; } = null!;
    public decimal Precio { get; set; }
    public DateTime FechaIngreso { get; set; }
    public int Cantidad { get; set; }


    public int ProductId { get; set; }
    public string? ProductoNombre { get; set; }
}
