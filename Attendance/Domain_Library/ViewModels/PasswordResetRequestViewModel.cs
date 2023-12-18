using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class PasswordResetRequestViewModel
    {
        public int Id { get; set; }
        public string MobileNumber { get; set; }

        public string Otp { get; set; }

        public DateTime RequestedAt { get; set; }

    }

    public class PasswordResetRequestInsertModel
    {
        public string MobileNumber { get; set; }

        public string Otp { get; set; }

        public DateTime RequestedAt { get; set; }
    }
}
