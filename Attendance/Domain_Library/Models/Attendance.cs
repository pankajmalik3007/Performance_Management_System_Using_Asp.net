using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library
{
    public class Attendance : BaseEntity
    {
        public int UserId { get; set; }
        

       
        public DateTime CheckInTime { get; set; }
       

        [JsonIgnore]

        public virtual List<Report> Report { get; set; }
        public User User { get; set; }

    }
}
