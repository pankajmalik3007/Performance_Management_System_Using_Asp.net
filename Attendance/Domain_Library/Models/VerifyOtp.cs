using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class VerifyOtp : BaseEntity
    {
        public int ForgotPasswordId { get; set; }
        public string Otp { get; set; }

     
        public virtual ForgotPassword ForgotPassword { get; set; }

       
        public virtual ResetPassword ResetPassword { get; set; }
    }
}
