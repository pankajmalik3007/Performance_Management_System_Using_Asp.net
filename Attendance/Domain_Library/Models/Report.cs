using Domain_Library.Models;
using System;
using System.Text.Json.Serialization;

namespace Domain_Library
{
    public class Report : BaseEntity
    {
        public int UserId { get; set; }
        public int CheckoutTimeId { get; set; }

        public int AttendanceId { get; set; }

        public int StartBreakId { get; set; }
        public int FinishBreakID { get; set; }
       





        [JsonIgnore]
        public User User { get; set; }
       
        public ClockoutTime ClockoutTime { get; set; }

        public Attendance Attendance { get; set; }

        public StartBreak AttendBreak { get; set; }

        public FinishBreak FinishBreak { get; set; }



    }
}
