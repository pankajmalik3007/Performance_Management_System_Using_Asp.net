
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Domain_Library.Models;
using Infra_Library.Context;
using Infra_Library.Services.CustomeServices.SMS;

[Route("api/[controller]")]
[ApiController]
public class PasswordManagementController : ControllerBase
{
    private readonly ILogger<PasswordManagementController> _logger;
    private readonly MainDbContext _dbContext;
    private readonly ISmsService _smsService;
    private readonly IConfiguration _configuration;

    public PasswordManagementController(
        ILogger<PasswordManagementController> logger,
        MainDbContext dbContext,
        ISmsService smsService,
        IConfiguration configuration)
    {
        _logger = logger;
        _dbContext = dbContext;
        _smsService = smsService;
        _configuration = configuration;
    }

    [HttpPost("ForgotPassword")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO forgotPasswordDTO)
    {
        try
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == forgotPasswordDTO.Userid);
            _logger.LogInformation($"User: {user}");

            if (user == null)
            {
                _logger.LogError("User not found");
                return BadRequest("User not found");
            }

            _logger.LogInformation($"User Properties: Id={user.Id}, Username={user.Username}, Email={user.Email}, ... (add other properties)");

            var forgotPassword = new ForgotPassword
            {
                UserId = user.Id,
                MobileNumber = forgotPasswordDTO.MobileNumber,
            };

            _dbContext.ForgotPasswords.Add(forgotPassword);
            await _dbContext.SaveChangesAsync();

            var otp = GenerateRandomOtp();
            var twilioAccountSid = _configuration["Twilio:AccountSid"];
            var twilioAuthToken = _configuration["Twilio:AuthToken"];
            var twilioFromPhoneNumber = _configuration["Twilio:FromPhoneNumber"];

            var twilioService = new DefaultSmsService(twilioAccountSid, twilioAuthToken, twilioFromPhoneNumber);

            await twilioService.SendOtpAsync(forgotPasswordDTO.MobileNumber, otp);
            await _dbContext.SaveChangesAsync();

            return Ok($"Password reset request created successfully, and the OTP is: {otp}");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error during password reset request: {ex.Message}");
            _logger.LogError($"Stack Trace: {ex.StackTrace}");
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


    [HttpPost("VerifyOtp")]
    public async Task<IActionResult> VerifyOtp(VerifyOtpModel verifyOtpModel)
    {
        try
        {
            var forgotPassword = await _dbContext.ForgotPasswords
                .FirstOrDefaultAsync(fp => fp.Id == verifyOtpModel.ForgotPasswordId);

            if (forgotPassword == null)
            {
                return BadRequest("Invalid OTP");
            }

            var result = new VerifyOtp
            {
                ForgotPasswordId = verifyOtpModel.ForgotPasswordId,
                Otp = verifyOtpModel.Otp
            };

            _dbContext.VerifyOtps.Add(result);
            await _dbContext.SaveChangesAsync();

            return Ok("OTP verified successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error during OTP verification: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }


    [HttpPost("ResetPassword")]
    public async Task<IActionResult> ResetPassword(ResetPasswordModel resetPasswordModel)
    {
        try
        {
            var verifyOtp = await _dbContext.VerifyOtps
                .Include(vo => vo.ForgotPassword)
                .FirstOrDefaultAsync(vo => vo.Id == resetPasswordModel.VerifyOtpId);

            if (verifyOtp == null)
            {
                return BadRequest("Invalid verification request");
            }

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Id == verifyOtp.ForgotPassword.UserId);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            user.Password = resetPasswordModel.NewPassword;

            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();


            return Ok("Password reset successful");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error during password reset: {ex.Message}");
            return StatusCode(500, "Internal server error");
        }
    }

    private string GenerateRandomOtp()
    {
        Random rand = new Random();
        int otpValue = rand.Next(1000, 9999);

        DateTime expirationTime = DateTime.Now.AddMinutes(5);


        Console.WriteLine($"OTP: {otpValue}, Expiration Time: {expirationTime}");

        return otpValue.ToString("D4");
    }


    public class VerifyOtpModel
    {
        public int ForgotPasswordId { get; set; }
        public string Otp { get; set; }
    }

    public class ResetPasswordModel
    {
        public int VerifyOtpId { get; set; }
        public string NewPassword { get; set; }
    }

    public class ForgotPasswordDTO
    {
        public int Userid { get; set; }
        public string MobileNumber { get; set; }
    }
}


