/*using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infra_Library.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManualRequestController : ControllerBase
    {
        private readonly MainDbContext _context;

        public ManualRequestController(MainDbContext context)
        {
            _context = context;
        }
        [HttpPost("InsertManualRequest")]
        public IActionResult InsertManualRequest([FromBody] ManualRequestInsertModel requestModel)
        {
            try
            {
                var user = _context.Users.Find(requestModel.UserId);
                if (user == null)
                {
                    return NotFound(new { error = "User not found" });
                }

                var manualRequest = new ManualRequest
                {
                    UserId = requestModel.UserId,
                    BreakType = requestModel.BreakType,
                    ClockInTime = requestModel.ClockInTime,
                    ClockOutTime = requestModel.ClockOutTime,
                    status = string.IsNullOrWhiteSpace(requestModel.status) ? "Pending" : requestModel.status,
                    EmployeeRemark = requestModel.EmployeeRemark
                };

                _context.ManualRequests.Add(manualRequest);
                _context.SaveChanges();

                return Ok(new { message = "Manual request inserted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }


    }
}
*/


using Domain_Library.Models;
using Domain_Library.ViewModels;
using Infra_Library.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManualRequestController : ControllerBase
    {
        private readonly MainDbContext _context;

        public ManualRequestController(MainDbContext context)
        {
            _context = context;
        }

        [HttpPost("InsertManualRequest")]
        public IActionResult InsertManualRequest([FromBody] ManualRequestInsertModel requestModel)
        {
            try
            {
                var user = _context.Users.Find(requestModel.UserId);
                if (user == null)
                {
                    return NotFound(new { error = "User not found" });
                }

                var manualRequest = new ManualRequest
                {
                    UserId = requestModel.UserId,
                    BreakType = requestModel.BreakType,
                    ClockInTime = requestModel.ClockInTime,
                    ClockOutTime = requestModel.ClockOutTime,
                    status = string.IsNullOrWhiteSpace(requestModel.status) ? "Pending" : requestModel.status,
                    EmployeeRemark = requestModel.EmployeeRemark
                };

                _context.ManualRequests.Add(manualRequest);
                _context.SaveChanges();

                return Ok(new { message = "Manual request inserted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpGet("GetManualRequestByUserId/{userId}")]
        public IActionResult GetManualRequestByUserId(int userId)
        {
            try
            {
                var manualRequests = _context.ManualRequests
                    .Where(m => m.UserId == userId)
                    .ToList();

                return Ok(manualRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }


        [HttpGet("GetAllManualRequests")]
        public IActionResult GetAllManualRequests()
        {
            try
            {
                var manualRequests = _context.ManualRequests.ToList();

                return Ok(manualRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }

        [HttpPut("UpdateManualRequestStatus")]
        public IActionResult UpdateManualRequestStatus([FromQuery] int manualRequestId, [FromBody] UpdateStatusModel updateModel)
        {
            try
            {
                var manualRequest = _context.ManualRequests.Find(manualRequestId);

                if (manualRequest == null)
                {
                    return NotFound(new { error = "Manual request not found" });
                }

                manualRequest.status = updateModel.NewStatus;

                _context.SaveChanges();

                return Ok(new { message = "Manual request status updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Internal server error: {ex.Message}" });
            }
        }
        public class UpdateStatusModel
        {
            public string NewStatus { get; set; }
        }

    }

}

