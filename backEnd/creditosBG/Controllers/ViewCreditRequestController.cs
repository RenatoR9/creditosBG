﻿using creditosBG.Dtos;
using creditosBG.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace creditosBG.Controllers
{
    [Authorize(Roles = "Analista")]
    [Route("api/[controller]")]
    [ApiController]
    public class ViewCreditRequestController : ControllerBase
    {
        private readonly ViewCreditRequestService _creditRequestService;

        public ViewCreditRequestController(ViewCreditRequestService creditRequestService)
        {
            _creditRequestService = creditRequestService;
        }

        [HttpPut("updateStatus")]
        [Authorize(Roles = "Analista")]

        public async Task<IActionResult> UpdateStatus([FromBody] UpdateCreditRequestStatusDto dto)
        {
            try
            {
                await _creditRequestService.UpdateCreditRequestStatus(dto.EntityId, dto.NewStatus, dto.UserId);
                return Ok();
            }
            catch (Exception ex)
            {                
                return BadRequest(ex.Message);
            }
        }

    }
}
