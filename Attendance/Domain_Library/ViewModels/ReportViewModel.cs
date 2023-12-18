using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class ReportViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public TimeSpan LunchBreakTime { get; set; }
        public TimeSpan PersonalBreakTime { get; set; }
        public DateTime CheckOutTime { get; set; }
        public double TotalHours { get; set; }
        public double ActualHours { get; set; }
        public List<UserViewModel> User { get; set; } = new List<UserViewModel>();

    }
    public class ReportInsertModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
       
        public DateTime CheckOutTime { get; set; }
        public double TotalHours { get; set; }
        public double ActualHours { get; set; }
    }

    public class ReportUpdateModel : ReportInsertModel 
    {
        public int Id { get; set; }

    }
}
