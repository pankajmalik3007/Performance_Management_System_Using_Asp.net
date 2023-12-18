using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public  class ManualRequestViewModel
    {
        public int Id { get; set; }
        public string BreakType { get; set; }
        public DateTime ClockInTime { get; set; }
        public DateTime ClockOutTime { get; set; }
        public string status { get; set; }
        public string EmployeeRemark { get; set; }
    }

    public class ManualRequestInsertModel
    {
        public int UserId { get; set; }
        public string BreakType { get; set; }
        public DateTime ClockInTime { get; set; }
        public DateTime ClockOutTime { get; set; }
        public string status { get; set; }
        public string EmployeeRemark { get; set; }
    }
}
