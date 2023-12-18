using Domain_Library.Models;
using Infra_Library.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinishBreakController : ControllerBase
    {
        private readonly MainDbContext _context;

        public FinishBreakController(MainDbContext context)
        {
            _context = context;
        }

      
        [HttpPost("Finish")]
        public async Task<IActionResult> FinishBreak([FromBody] FinishBreakRequest finishBreakRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
               
                if (!_context.Users.Any(u => u.Id == finishBreakRequest.UserId))
                {
                    return NotFound("User not found.");
                }

                var finishBreak = new FinishBreak
                {
                    UserId = finishBreakRequest.UserId,
                    finishBreak = DateTime.Now 
                };

                _context.FinishBreaks.Add(finishBreak);
                await _context.SaveChangesAsync();

                return CreatedAtAction("FinishBreak", new { id = finishBreak.Id }, finishBreak);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        public class FinishBreakRequest
        {
            public int UserId { get; set; }
        }
    }
}
