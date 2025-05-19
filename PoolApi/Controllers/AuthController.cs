using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PoolApi.Data;
using PoolApi.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;
    private readonly PasswordHasher<Usuario> _passwordHasher;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context; _config = config; _passwordHasher = new PasswordHasher<Usuario>();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        var user = _context.Usuarios.SingleOrDefault(u => u.Email == loginRequest.Email);
        if (user == null || !VerifyPassword(loginRequest.Password, user.PasswordHash!, user))
        {
            return Unauthorized(new { message = "Usuario o contraseña incorrectos" });
        }

        var token = GenerateJwtToken(user);
        var username = user.Username;
        var email = user.Email;

        return Ok(new { token, username, email });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
    {
        if (await _context.Usuarios.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("El email ya está registrado");

        var user = new Usuario
        {
            Name = dto.Name,
            Email = dto.Email,
            Username = dto.Email.Split('@')[0],
            Role = "Empleado"
        };

        user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

        _context.Usuarios.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Cuenta creada correctamente" });
    }

    private bool VerifyPassword(string password, string storedHash, Usuario user)
    {
        var result = _passwordHasher.VerifyHashedPassword(user, storedHash, password);
        return result == PasswordVerificationResult.Success;
    }


    private string GenerateJwtToken(Usuario user)
    {
        var jwtSettings = _config.GetSection("Jwt");
        var secretKey = jwtSettings["Key"];
        if (string.IsNullOrWhiteSpace(secretKey))
            throw new InvalidOperationException("JWT Key is missing from configuration");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username ?? ""),
            new Claim("role", user.Role ?? "")
        };


        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}