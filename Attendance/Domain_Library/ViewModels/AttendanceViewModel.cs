using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public  class AttendanceViewModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
      
        public DateTime CheckInTime { get; set; }

        public List<UserViewModel> User { get; set; } = new List<UserViewModel>();
    }

    public class AttendanceInsertModel
    {
        public int UserId { get; set; }
       
        public DateTime CheckInTime { get; set; }
    
        

    }
    public class AttendanceUpdateModel : AttendanceInsertModel 
    {
        public int Id { get; set; }

    }
}
