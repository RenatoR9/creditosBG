using creditosBG.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace creditosBG.Services
{
    public class AuthService
    {
        private readonly CreditosBgContext _bd;
        private readonly IConfiguration _conf;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthService(CreditosBgContext bd, IConfiguration conf)
        {
            _bd = bd;
            _conf = conf;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<string> AuthenticateAsync(string userName, string password)
        {
            var user = await _bd.Users
                .FirstOrDefaultAsync(u => u.Username == userName);

            if (user == null)
                return null;

            /// Verificar contraseña
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordUser, password);
            if (result == PasswordVerificationResult.Failed)
                return null;

            // Crear token JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_conf["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("UserId", user.Id.ToString()),
                new Claim("RoleId", user.RoleId.ToString())
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<bool> RegisterAsync(string userName, string password)
        {
            // Verificar si ya existe usuario
            if (await _bd.Users.AnyAsync(u => u.Username == userName))
                return false;

            var user = new User
            {
                Username = userName,
                RoleId = 1
            };

            // Hashear la contraseña
            user.PasswordUser = _passwordHasher.HashPassword(user, password);

            _bd.Users.Add(user);
            await _bd.SaveChangesAsync();

            return true;
        }
    }
}
