using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PoolApi.Data;
using PoolApi.Entities;
using System;
using System.ComponentModel;
using System.Diagnostics.Eventing.Reader;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;



[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public ProductsController(AppDbContext context, IConfiguration config)
    {
        _context = context; _config = config;
    }

    [Authorize]
    [HttpGet("all")]
    public async Task<IActionResult> getAllProducts()
    {
        var productos = await _context.Productos.Select(p => new ProductoDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description
        })
         .ToListAsync();
        return Ok(productos);
    }

    [Authorize]
    [HttpPost("registerProduct")]
    public async Task<IActionResult> RegisterProduct([FromBody] RegisterProductDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (await _context.Productos.AnyAsync(p => p.Name == dto.Name))
            return BadRequest("Un producto con el mismo nombre ya está registrado");

        var producto = new Producto
        {
            Name = dto.Name,
            Description = dto.Description,
        };

        await _context.Productos.AddAsync(producto);
        await _context.SaveChangesAsync();

        return Ok(producto);
    }




}