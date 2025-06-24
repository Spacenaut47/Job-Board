using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using JobBoardAPI.Models;
using JobBoardAPI.Data;
using JobBoardAPI.DTOs;
using JobBoardAPI.Services;

namespace JobBoardAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;
    private readonly PasswordHasher<User> _hasher = new();

    public AuthController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (_context.Users.Any(u => u.Email == dto.Email))
            return BadRequest("Email already exists");

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email
        };

        user.PasswordHash = _hasher.HashPassword(user, dto.Password);

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { token = _tokenService.CreateToken(user) });
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var user = _context.Users.SingleOrDefault(u => u.Email == dto.Email);
        if (user == null)
            return Unauthorized("Invalid credentials");

        var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
        if (result != PasswordVerificationResult.Success)
            return Unauthorized("Invalid credentials");

        return Ok(new { token = _tokenService.CreateToken(user) });
    }
}
