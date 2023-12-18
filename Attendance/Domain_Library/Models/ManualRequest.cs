using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class ManualRequest : BaseEntity
    {
        public int UserId { get; set; }

        public string BreakType { get; set; }
        public DateTime ClockInTime { get; set; }
        public DateTime ClockOutTime { get; set; }
        public string status { get; set; }
        public string EmployeeRemark { get; set; }

        [JsonIgnore]
        public User User { get; set; }

    }
}
