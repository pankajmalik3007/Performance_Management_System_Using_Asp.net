using Infra_Library.Context;
using Infra_Library.Services.CustomeServices.LeaveTypeServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveHistoryController : ControllerBase
    {
        private readonly MainDbContext _context;

        public LeaveHistoryController(MainDbContext context)
        {
            _context = context;
        }

       
        [HttpGet("{userId}")]
        public IActionResult GetLeaveHistory(int userId)
        {
           
            var leaveHistory = _context.Leaves
                .Include(l => l.User)
                .Where(l => l.UserId == userId)
                .Select(l => new
                {
                    UserId = l.UserId,
                    Username = l.User.Username, 
                   
                    LeaveRequestTime = l.LeaveRequestTime,
                    StartLeaveDate = l.StartLeaveDate,
                    EndLeaveDate = l.EndLeaveDate,
                    Status = l.Status,
                    LeaveStatusTime = l.LeaveStatusTime,
                    Reason = l.Reason,
                    LeaveType =l.LeaveType,
                })
                .ToList();

            if (leaveHistory.Any())
            {
                return Ok(leaveHistory);
            }

            
            return NotFound($"No leave history found for user with ID {userId}");
        }
    }
}
