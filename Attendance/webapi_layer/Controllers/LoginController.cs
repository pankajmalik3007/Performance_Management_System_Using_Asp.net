using Domain_Library.ViewModels;
using Domain_Library;
using Microsoft.AspNetCore.Mvc;
using RepositoryAndServices.Services.GeneralServices;
using webapi_layer.Middleware.Auth;
using Infra_Library.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Infra_Library.Context;

using Domain_Library.Models;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly ILogger _logger;
    private readonly IJWTAuthManager _authManager;
    private readonly IServices<UserType> _serviceUserType;
    private readonly IServices<User> _userService;
    private readonly MainDbContext _dbContext;
   

    public LoginController(
        ILogger<LoginController> logger,
        IServices<UserType> serviceUserType,
        IServices<User> userService,
        IJWTAuthManager authManager,
        MainDbContext dbContext)
      
    {
        _logger = logger;
        _serviceUserType = serviceUserType;
        _userService = userService;
        _authManager = authManager;
        _dbContext = dbContext;
       
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register(UserInsertModel userModel)
    {
        try
        {
            var newUser = new User
            {
                Username = userModel.Username,
                Password = Encryptor.EncryptString(userModel.Password),
                Email = userModel.Email,
                PhoneNo = userModel.PhoneNo,
                Adress = userModel.Adress,
                UserTypeId = userModel.UserTypeId,
                Role = userModel.Role,
            };

            await Task.Run(() => _userService.Insert(newUser));

            return Ok("Registration successful");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error during user registration: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginModel loginModel)
    {
        try
        {
            var user = await _userService.Find(u => u.Username == loginModel.UserName);

            if (user == null || user.Password != Encryptor.EncryptString(loginModel.Password))
            {
                return Unauthorized("Invalid username or password");
            }

            var token = _authManager.GenerateJWT(user);
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error during user login: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }


}

