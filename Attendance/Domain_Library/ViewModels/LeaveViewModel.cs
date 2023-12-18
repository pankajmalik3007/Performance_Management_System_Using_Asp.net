
using System;
using System.Collections.Generic;

namespace Domain_Library.ViewModels
{
    public class LeaveViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime LeaveRequestTime { get; set; }
        public DateTime LeaveStatusTime { get; set; }
        public DateTime StartLeaveDate { get; set; }
        public DateTime EndLeaveDate { get; set; }
        public string LeaveType { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }

        public class LeaveInsertModel
        {
            public int UserId { get; set; }

            public string LeaveType { get; set; }
            public string Status { get; set; }
            public string Reason { get; set; }
         
            public DateTime StartLeaveDate { get; set; }
            public DateTime EndLeaveDate { get; set; }
        }

        public class LeaveUpdateModel : LeaveInsertModel
        {
            public int Id { get; set; }
        }
    }
}


