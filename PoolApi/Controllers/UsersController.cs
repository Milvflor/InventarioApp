using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PoolApi.Data;
using PoolApi.Entities;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;


[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public UsersController(AppDbContext context, IConfiguration config)
    {
        _context = context; _config = config;
    }

    [Authorize]
    [HttpGet("all")]
    public async Task<IActionResult> getAllUsers()
    {
        var usuarios = await _context.Usuarios.Select(
            u=> new UsuarioDto
            {
                Id=u.Id,
                Name = u.Name,
                Email = u.Email,
                Username = u.Username,
                Role = u.Role
            }
            ).ToListAsync();
        return Ok(usuarios);
    }

    

}