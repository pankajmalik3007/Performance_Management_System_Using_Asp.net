
using Domain_Library;
using Domain_Library.ViewModels;
using Infra_Library.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Infra_Library.Services.CustomeServices.LeaveTypeServices
{
    public class LeaveType : ILeaveType
    {
        private readonly IRepository<Leave> _leaveRepository;

        public LeaveType(IRepository<Leave> leaveRepository)
        {
            _leaveRepository = leaveRepository;
        }

        public async Task<bool> Delete(int Id)
        {
            if (Id != null)
            {
                Leave leave = await _leaveRepository.Get(Id);
                if (leave != null)
                {
                    return await _leaveRepository.Delete(leave);
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public Task<Leave> Find(Expression<Func<Leave, bool>> match)
        {
            return _leaveRepository.Find(match);
        }

        public async Task<LeaveViewModel> Get(int Id)
        {
            var result = await _leaveRepository.Get(Id);
            if (result == null)
                return null;
            else
            {
                LeaveViewModel leaveViewModel = new()
                {
                    Id = result.Id,
                    UserId = result.UserId,
                    LeaveType = result.LeaveType,
                    LeaveRequestTime = result.LeaveRequestTime,
                    LeaveStatusTime = result.LeaveStatusTime,
                    StartLeaveDate = result.StartLeaveDate,
                    EndLeaveDate = result.EndLeaveDate,
                    Status = result.Status,
                    Reason = result.Reason
                };
                return leaveViewModel;
            }
        }

        public async Task<ICollection<LeaveViewModel>> GetAll()
        {
            ICollection<LeaveViewModel> leaveViewModels = new List<LeaveViewModel>();
            ICollection<Leave> leaves = await _leaveRepository.GetAll();
            foreach (Leave leave in leaves)
            {
                LeaveViewModel leaveView = new()
                {
                    Id = leave.Id,
                    UserId = leave.UserId,
                    LeaveType = leave.LeaveType,
                    LeaveRequestTime = leave.LeaveRequestTime,
                    LeaveStatusTime = leave.LeaveStatusTime,
                    StartLeaveDate = leave.StartLeaveDate,
                    EndLeaveDate = leave.EndLeaveDate,
                    Status = leave.Status,
                    Reason = leave.Reason
                };
                leaveViewModels.Add(leaveView);
            }
            return leaveViewModels;
        }

        public Leave GetLast()
        {
            return _leaveRepository.GetLast();
        }

        public async Task<bool> Insert(LeaveViewModel.LeaveInsertModel leaveInsertModel)
        {
            leaveInsertModel.Status = "Pending";

            Leave leave = new()
            {
                UserId = leaveInsertModel.UserId,
                LeaveType = leaveInsertModel.LeaveType,
                Status = leaveInsertModel.Status,
                Reason = leaveInsertModel.Reason,
                StartLeaveDate = leaveInsertModel.StartLeaveDate,
                EndLeaveDate = leaveInsertModel.EndLeaveDate
            };

            return await _leaveRepository.Insert(leave);
        }
        public async Task<bool> Update(LeaveViewModel.LeaveUpdateModel leaveUpdateModel)
        {
           
            Leave leave = await _leaveRepository.Get(leaveUpdateModel.Id);

            if (leave != null)
            {
                if (leave.UserId != leaveUpdateModel.UserId)
                {
                    return false;
                }

                leave.LeaveType = leaveUpdateModel.LeaveType;
                leave.Status = leaveUpdateModel.Status;
                leave.Reason = leaveUpdateModel.Reason;
                leave.StartLeaveDate = leaveUpdateModel.StartLeaveDate;
                leave.EndLeaveDate = leaveUpdateModel.EndLeaveDate;

               
                var result = await _leaveRepository.Update(leave);

                return result;
            }
            else
            {
               
                return false;
            }
        }

        public async Task<bool> UpdateStatus(int leaveId, string status)
        {
            Leave leave = await _leaveRepository.Get(leaveId);
            if (leave != null)
            {
                leave.Status = status;

                if (status == "Approved")
                {
                    leave.LeaveStatusTime = DateTime.Now;
                    leave.EndLeaveDate = DateTime.Now; 
                }

                return await _leaveRepository.Update(leave);
            }
            else
            {
                return false;
            }
        }
    }
}
