using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class ResetPassword : BaseEntity
    {
        public int VerifyOtpId { get; set; }
        public string NewPassword { get; set; }

      
        public virtual VerifyOtp VerifyOtp { get; set; }
    }
}
