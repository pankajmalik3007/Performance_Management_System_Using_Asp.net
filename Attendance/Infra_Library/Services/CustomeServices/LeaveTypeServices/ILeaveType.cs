
using Domain_Library;
using Domain_Library.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infra_Library.Services.CustomeServices.LeaveTypeServices
{
    public interface ILeaveType
    {
        Task<ICollection<LeaveViewModel>> GetAll();
        Task<LeaveViewModel> Get(int Id);
        Leave GetLast();
        Task<bool> Insert(LeaveViewModel.LeaveInsertModel leaveInsertModel);
        Task<bool> Update(LeaveViewModel.LeaveUpdateModel leaveUpdateModel);
        Task<bool> UpdateStatus(int leaveId, string status);
        Task<bool> Delete(int Id);
        Task<Leave> Find(Expression<Func<Leave, bool>> match);
    }
}
