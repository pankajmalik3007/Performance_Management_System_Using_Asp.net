using Domain_Library.ViewModels;
using Domain_Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Domain_Library.ViewModels.LeaveViewModel;

namespace Infra_Library.Services.CustomeServices.Attendance_Type
{
    public interface IAttendanceTypeService
    {
        Task<ICollection<AttendanceViewModel>> GetAll();
        Task<AttendanceViewModel> Get(int Id);
      
        Task<(int LoginCount,  UserViewModel UserDetails, List<DateTime> ClockInTimes)> GetLoginCountAndUserDetailsByUserId(int userId);
        Attendance GetLast();
        Task<bool> Insert(AttendanceInsertModel userInsertModel);
        Task<bool> Update(AttendanceUpdateModel userUpdateModel);
        Task<bool> Delete(int Id);
        Task<Attendance> Find(Expression<Func<Attendance, bool>> match);
    }
}
