using Domain_Library.Models;
using Infra_Library.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClockoutTimeController : ControllerBase
    {
        private readonly MainDbContext _context;

        public ClockoutTimeController(MainDbContext context)
        {
            _context = context;
        }

        
        [HttpPost("ClockOut")]
        public async Task<IActionResult> ClockOut([FromBody] ClockoutTimeRequest clockoutTimeRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
               
                if (!_context.Users.Any(u => u.Id == clockoutTimeRequest.UserId))
                {
                    return NotFound("User not found.");
                }

                var clockoutTime = new ClockoutTime
                {
                    UserId = clockoutTimeRequest.UserId,
                    ClockOutTime = DateTime.Now 
                };

                _context.ClockoutTimes.Add(clockoutTime);
                await _context.SaveChangesAsync();

                return CreatedAtAction("ClockoutTime", new { id = clockoutTime.Id }, clockoutTime);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        public class ClockoutTimeRequest
        {
            public int UserId { get; set; }
            
        }
    }
}
