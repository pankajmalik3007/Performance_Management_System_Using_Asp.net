using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Twilio.Rest.Api.V2010.Account;
using Twilio;

namespace Infra_Library.Services.CustomeServices.SMS
{
    public class DefaultSmsService : ISmsService
    {
        private readonly string _accountSid;
        private readonly string _authToken;
        private readonly string _fromPhoneNumber; 

        public DefaultSmsService(string accountSid, string authToken, string fromPhoneNumber)
        {
            _accountSid = accountSid;
            _authToken = authToken;
            _fromPhoneNumber = fromPhoneNumber;
        }

        public DefaultSmsService(IConfiguration configuration)
        {
            _accountSid = configuration["Twilio:AccountSid"];
            
            _authToken = configuration["Twilio:AuthToken"];
            _fromPhoneNumber = configuration["Twilio:FromPhoneNumber"];
        }

        public async Task SendOtpAsync(string phoneNumber, string otp)
        {
            try
            {
               
                Console.WriteLine($"Sending OTP to: {phoneNumber}");

                TwilioClient.Init(_accountSid, _authToken);

                var message = await MessageResource.CreateAsync(
                    body: $"Your OTP is: {otp}",
                    from: new Twilio.Types.PhoneNumber(_fromPhoneNumber),
                    to: new Twilio.Types.PhoneNumber(phoneNumber)
                );

                if (message.Status != MessageResource.StatusEnum.Sent)
                {
                    throw new Exception($"Failed to send SMS. Status: {message.Status}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending SMS: {ex.Message}");
                throw;
            }
        }

    }
}
