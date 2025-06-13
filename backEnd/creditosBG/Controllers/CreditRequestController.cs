using creditosBG.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace creditosBG.Controllers
{
    [Authorize(Roles = "Solicitante,Analista")]
    [Route("api/[controller]")]
    [ApiController]
    public class CreditRequestController : ControllerBase
    {
        private readonly CreditosBgContext _bd;

        public CreditRequestController(CreditosBgContext bd)
        {
            _bd = bd;
        }

        [HttpGet]
        [Authorize(Roles = "Analista,Solicitante")]
        public async Task<ActionResult<IEnumerable<CreditRequest>>> GetAll()
        {
            return await _bd.CreditRequests.ToListAsync();
        }

        [HttpGet("{id}", Name = "GetCreditRequestById")]
        [Authorize(Roles = "Analista,Solicitante")]
        public async Task<ActionResult<CreditRequest>> GetById(int id)
        {
            var request = await _bd.CreditRequests.FindAsync(id);
            if (request == null) return NotFound();
            return request;
        }

        [HttpPost]
        [Authorize(Roles = "Solicitante")]
        public async Task<ActionResult<CreditRequest>> Create(CreditRequest request)
        {
            try
            {
                _bd.CreditRequests.Add(request);
                await _bd.SaveChangesAsync();

                var userIdClaim = User.FindFirst("UserId")?.Value;
                if (!int.TryParse(userIdClaim, out var userId))
                    return Unauthorized("UserId inválido en el token");

                var audit = new AuditLog
                {
                    CreationDate = DateTime.Now,
                    UserId = userId,
                    Details = "ingreso de nueva solicitud",
                    Entity = "CreditRequests",
                    EntityId = request.Id,
                    OldStatus = "",
                    NewStatus = request.Status
                };
                _bd.AuditLogs.Add(audit);
                await _bd.SaveChangesAsync();

                return CreatedAtRoute("GetCreditRequestById", new { id = request.Id }, request);
            }
            catch (Exception ex)
            {
                // Retorna el error para que lo puedas ver en el frontend
                return StatusCode(500, $"Error interno: {ex.Message} - {ex.InnerException?.Message}");
            }
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Solicitante")]
        public async Task<IActionResult> Update(int id, CreditRequest request)
        {
            if (id != request.Id)
                return BadRequest();

            _bd.Entry(request).State = EntityState.Modified;
            await _bd.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Solicitante")]
        public async Task<IActionResult> Delete(int id)
        {
            var request = await _bd.CreditRequests.FindAsync(id);
            if (request == null) return NotFound();

            _bd.CreditRequests.Remove(request);
            await _bd.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "Solicitante,Analista")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var requests = await _bd.CreditRequests
                .Where(c => c.UserId == userId)
                .ToListAsync();

            return Ok(requests);
        }
    }
}
