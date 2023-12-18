using Domain_Library.ViewModels;
using Infra_Library.Services.CustomeServices.LeaveTypeServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepositoryAndServices.Services;
using static Domain_Library.ViewModels.LeaveViewModel;

namespace webapi_layer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly IUserService _serviceUserType;
        public UserController(IUserService serviceUserType)
        {
            _serviceUserType = serviceUserType;
        }
        [Route("GetAllUser")]
        [HttpGet]
        public async Task<ActionResult<UserViewModel>> GetAllUser()
        {
            var result = await _serviceUserType.GetAll();

            if (result == null)
                return BadRequest("No Records Found, Please Try Again After Adding them...!");

            return Ok(result);
        }


        [Route("GetUser")]
        [HttpGet]
        public async Task<ActionResult<UserViewModel>> GetUser(int Id)
        {
            if (Id != null)
            {
                var result = await _serviceUserType.Get(Id);

                if (result == null)
                    return BadRequest("No Records Found, Please Try Again After Adding them...!");

                return Ok(result);
            }
            else
                return NotFound("Invalid UserType ID, Please Entering a Valid One...!");
        }

        [Route("InsertUser")]
        [HttpPost]
        public async Task<IActionResult> InsertUser(UserInsertModel userTypeInsertModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _serviceUserType.Insert(userTypeInsertModel);
                if (result == true)
                    return Ok("UserType Inserted Successfully...!");
                else
                    return BadRequest("Something Went Wrong, UserType Is Not Inserted, Please Try After Sometime...!");
            }
            else
                return BadRequest("Invalid UserType Information, Please Provide Correct Details for UserType...!");
        }

        [Route("UpdateUser")]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UserUpdateModel userTypeModel)
        {
            if (ModelState.IsValid)
            {
                var result = await _serviceUserType.Update(userTypeModel);
                if (result == true)
                    return Ok(userTypeModel);
                else
                    return BadRequest("Something went wrong, Please Try again later...!");
            }
            else
                return BadRequest("Invalid UserType Information, Please Provide Correct Details for UserType...!");
        }

        [Route("DeleteUser")]
        [HttpDelete]

        public async Task<IActionResult> DeleteUser(int Id)
        {
            var result = await _serviceUserType.Delete(Id);
            if (result == true)
                return Ok("UserType Deleted Successfully...!");
            else
                return BadRequest("UserType is not deleted, Please Try again later...!");

        }
        [Route("InitializeUsers")]
        [HttpPost]
        public async Task<IActionResult> InitializeUsers()
        {
            try
            {
                await _serviceUserType.InitializeUsers();
                return Ok("Users Initialized Successfully!");
            }
            catch (Exception ex)
            {
               
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }
    }
}
