using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PoolApi.Data;
using PoolApi.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;



[ApiController]
[Route("api/lotes")]
public class LotesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public LotesController(AppDbContext context, IConfiguration config)
    {
        _context = context; _config = config;
    }

    [Authorize]
    [HttpGet("all")]
    public async Task<IActionResult> getAllLotes()
    {
        var lotes = await _context.Lotes
         .Include(l => l.Producto)
         .Select(l => new LoteConProductoDto
         {
             Id = l.Id,
             NumeroLote = l.NumeroLote,
             Precio = l.Precio,
             FechaIngreso = l.FechaIngreso,
             Cantidad = l.Cantidad,
             ProductId = l.ProductId,
             ProductoNombre = l.Producto != null ? l.Producto.Name : null,
         })
         .ToListAsync();

        return Ok(lotes);
    }

    [Authorize]
    [HttpPost("registerLote")]
    public async Task<IActionResult> RegisterLote([FromBody] RegisterLoteDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var producto = await _context.Productos
            .Include(p => p.Lotes) // Cargamos la colección Lotes
            .FirstOrDefaultAsync(u => u.Id == dto.ProductId);

        if (producto == null)
        {
            return Unauthorized(new { message = "El producto no se encuentra disponible." });
        }

        var ultimoLote = await _context.Lotes.OrderByDescending(l => l.Id).FirstOrDefaultAsync();

        int siguienteNumero = 1;

        if (ultimoLote != null && int.TryParse(ultimoLote.NumeroLote, out int numeroActual))
        {
            siguienteNumero = numeroActual + 1;
        }

        string numeroFormateado = siguienteNumero.ToString("D9");


        var lote = new Lote
        {
            NumeroLote=numeroFormateado,
            Precio = dto.Precio,
            FechaIngreso = dto.FechaIngreso,
            Cantidad = dto.Cantidad,
            ProductId = dto.ProductId
        };

        producto.Lotes ??= new List<Lote>();

        producto.Lotes.Add(lote);

        await _context.Lotes.AddAsync(lote);
        await _context.SaveChangesAsync();

        return Ok(new
        {   
            lote.NumeroLote,
            lote.Id,
            lote.Precio,
            lote.FechaIngreso,
            lote.Cantidad,
            lote.ProductId
        });

    }

    [Authorize]
    [HttpGet("precios")]
    public async Task<IActionResult> GetPreciosPorProductoYFecha([FromQuery] int productId, [FromQuery] DateTime fecha)
    {
        var precios = await _context.Lotes
            .Where(l => l.ProductId == productId && l.FechaIngreso.Date == fecha.Date)
            .Select(l => new
            {
                Producto = l.Producto != null ? l.Producto.Name : "Sin nombre",
                Precio = l.Precio,
                Fecha = l.FechaIngreso
            })
            .ToListAsync();

        return Ok(precios);
    }

    [Authorize]
    [HttpGet("precios-por-fecha")]
    public async Task<IActionResult> GetPreciosPorFecha([FromQuery] DateTime fecha)
    {
        var precios = await _context.Lotes
            .Where(l => l.FechaIngreso.Date == fecha.Date)
            .Include(l => l.Producto)
            .Select(l => new
            {
                Producto = l.Producto.Name,
                Precio = l.Precio,
                Fecha = l.FechaIngreso
            })
            .ToListAsync();

        return Ok(precios);
    }





}