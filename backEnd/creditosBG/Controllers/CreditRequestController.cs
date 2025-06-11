using creditosBG.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace creditosBG.Controllers
{
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
        public async Task<ActionResult<IEnumerable<CreditRequest>>> GetAll()
        {
            return await _bd.CreditRequests.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CreditRequest>> GetById(int id)
        {
            var request = await _bd.CreditRequests.FindAsync(id);
            if (request == null) return NotFound();
            return request;
        }

        [HttpPost]
        public async Task<ActionResult<CreditRequest>> Create(CreditRequest request)
        {
            _bd.CreditRequests.Add(request);
            await _bd.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = request.Id }, request);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreditRequest request)
        {
            if (id != request.Id)
                return BadRequest();

            _bd.Entry(request).State = EntityState.Modified;
            await _bd.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var request = await _bd.CreditRequests.FindAsync(id);
            if (request == null) return NotFound();

            _bd.CreditRequests.Remove(request);
            await _bd.SaveChangesAsync();
            return NoContent();
        }
    }
}
