

using Domain_Library.ViewModels;

using Infra_Library.Services.CustomeServices.LeaveTypeServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using static Domain_Library.ViewModels.LeaveViewModel;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LeaveController : ControllerBase
    {
        private readonly ILeaveType _serviceLeave;

        public LeaveController(ILeaveType serviceLeave)
        {
            _serviceLeave = serviceLeave;
        }

        [Route("GetAllLeaves")]
        [HttpGet]
        public async Task<ActionResult<LeaveViewModel>> GetAllLeaves()
        {
            var result = await _serviceLeave.GetAll();

            if (result == null)
                return BadRequest("No Records Found, Please Try Again After Adding them...!");

            return Ok(result);
        }

        [Route("GetLeave")]
        [HttpGet]
        public async Task<ActionResult<LeaveViewModel>> GetLeave(int Id)
        {
            if (Id != null)
            {
                var result = await _serviceLeave.Get(Id);

                if (result == null)
                    return BadRequest("No Records Found, Please Try Again After Adding them...!");

                return Ok(result);
            }
            else
                return NotFound("Invalid Leave ID, Please Entering a Valid One...!");
        }
      
        [Route("InsertLeave")]
        [HttpPost]
        public async Task<IActionResult> InsertLeave([FromBody] LeaveInsertModel leaveInsertModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var userIdClaim = HttpContext.User.FindFirst("UserId");

                    if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
                    {
                        leaveInsertModel.UserId = userId;
                        var result = await _serviceLeave.Insert(leaveInsertModel);

                        if (result)
                            return Ok(new { message = "Leave Inserted Successfully" });
                        else
                            return BadRequest(new { error = "Something Went Wrong, Leave Is Not Inserted, Please Try After Sometime" });
                    }
                    else
                    {
                        return BadRequest(new { error = "Unable to retrieve or parse the user ID" });
                    }
                }
                else
                {
                    return BadRequest(new { error = "Invalid Leave Information, Please Provide Correct Details for Leave" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal Server Error: {ex.Message}" });
            }
        }


      

        [Route("DeleteLeave")]
        [HttpDelete]
        public async Task<IActionResult> DeleteLeave(int Id)
        {
            var result = await _serviceLeave.Delete(Id);
            if (result == true)
                return Ok("Leave Deleted Successfully...!");
            else
                return BadRequest("Leave is not deleted, Please Try again later...!");
        }


        [Route("UpdateLeaveStatus")]
        [HttpPut]
        [Authorize(Roles = "HR")]
        public async Task<IActionResult> UpdateLeaveStatus(int leaveId, string status)
        {
            var roles = User.FindAll(ClaimTypes.Role).Select(c => c.Value).ToList();
            Console.WriteLine($"User Roles: {string.Join(", ", roles)}");

            var result = await _serviceLeave.UpdateStatus(leaveId, status);

            if (result)
                return Ok($"Leave status updated to {status} successfully.");
            else
                return BadRequest("Failed to update leave status.");
        }

    }
}
