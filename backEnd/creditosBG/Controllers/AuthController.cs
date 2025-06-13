using creditosBG.Dtos;
using creditosBG.Services;
using Microsoft.AspNetCore.Mvc;

namespace creditosBG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request)
        {
            var token = await _authService.AuthenticateAsync(request.UserName, request.PasswordUser);

            if (token == null)
                return Unauthorized("Usuario o contraseña inválido.");

            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginRequestDto request)
        {
            var success = await _authService.RegisterAsync(request.UserName, request.PasswordUser);

            if (!success)
                return BadRequest("El usuario ya existe.");

            return Ok("Usuario registrado correctamente.");
        }
    }
}
