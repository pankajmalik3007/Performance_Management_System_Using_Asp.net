﻿
using System;
using System.Text.Json.Serialization;

namespace Domain_Library
{
    public class Leave : BaseEntity
    {
        public int UserId { get; set; }
        public DateTime LeaveRequestTime { get; set; }
        public DateTime LeaveStatusTime { get; set; }
        public DateTime StartLeaveDate { get; set; }
        public DateTime EndLeaveDate { get; set; }
        public string LeaveType { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }

        [JsonIgnore]
        public User User { get; set; }
    }
}
