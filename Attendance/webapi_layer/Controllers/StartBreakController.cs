using Domain_Library.Models;
using Infra_Library.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StartBreakController : ControllerBase
    {
        private readonly MainDbContext _context;

        public StartBreakController(MainDbContext context)
        {
            _context = context;
        }

       
        [HttpPost("Start")]
        public async Task<IActionResult> StartBreak([FromBody] StartBreakRequest startBreakRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                if (!_context.Users.Any(u => u.Id == startBreakRequest.UserId))
                {
                    return NotFound("User not found.");
                }

                var startBreak = new StartBreak
                {
                    UserId = startBreakRequest.UserId,
                    startbreak = DateTime.Now
                };

                _context.StartBreaks.Add(startBreak);
                await _context.SaveChangesAsync();

                return CreatedAtAction("StartBreak", new { id = startBreak.Id }, startBreak);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        public class StartBreakRequest
        {
            public int UserId { get; set; }
            
        }
    }
}
