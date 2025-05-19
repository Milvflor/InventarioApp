using System;
using System.Text.Json.Serialization;

public class RegisterLoteDto
{
    [JsonPropertyName("precio")]
    public decimal Precio { get; set; }

    [JsonPropertyName("fecha_ingreso")]
    public DateTime FechaIngreso { get; set; }

    [JsonPropertyName("cantidad")]
    public int Cantidad { get; set; }

    [JsonPropertyName("id_producto")]
    public int ProductId { get; set; }
}
