using Domain_Library;
using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infra_Library.Context;
using Infra_Library.Services.CustomeServices.Attendance_Type;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
      
        private readonly MainDbContext _context;

        public AttendanceController(MainDbContext context)
        {
            _context = context;
        }
        [HttpPost("Clockin")]
        public async Task<IActionResult> Clockin([FromBody] ClockinRequest clockinRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Ensure the user exists
                if (!_context.Users.Any(u => u.Id == clockinRequest.UserId))
                {
                    return NotFound("User not found.");
                }

                var checkInTime = new Attendance
                {
                    UserId = clockinRequest.UserId,
                    CheckInTime = DateTime.Now
                };

                _context.Attendances.Add(checkInTime);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAttendanceDetailByID", new { id = checkInTime.Id }, checkInTime);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetClockinTimes/{userId}")]
        public async Task<IActionResult> GetClockinTimes(int userId)
        {
            try
            {
                if (!_context.Users.Any(u => u.Id == userId))
                {
                    return NotFound("User not found.");
                }

                var clockinTimes = await _context.Attendances
                    .Where(a => a.UserId == userId)
                    .OrderByDescending(a => a.CheckInTime)
                    .ToListAsync();

                return Ok(clockinTimes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        public class ClockinRequest
        {
            public int UserId { get; set; }
        }
    }
}