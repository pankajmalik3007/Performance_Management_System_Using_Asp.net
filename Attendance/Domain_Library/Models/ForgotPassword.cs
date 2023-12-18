using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class ForgotPassword : BaseEntity
    {
        public int UserId { get; set; }
        public string MobileNumber { get; set; }

       
        public virtual User User { get; set; }

        
        public virtual VerifyOtp VerifyOtp { get; set; }
    }
}
