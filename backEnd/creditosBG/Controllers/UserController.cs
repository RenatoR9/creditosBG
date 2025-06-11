using creditosBG.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace creditosBG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public IActionResult getUsers()
        {
            using (CreditosBgContext bd = new CreditosBgContext())
            {
                var userList = bd.Users.ToList();
                return Ok(userList);
            }
        }
    }
}
