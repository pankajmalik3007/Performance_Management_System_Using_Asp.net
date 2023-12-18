using Domain_Library;
using Domain_Library.ViewModels;
using Infra_Library.Context;
using Infra_Library.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infra_Library.Services.CustomeServices.Attendance_Type
{
    public class AttendanceTypeService : IAttendanceTypeService
    {
        private readonly IRepository<Attendance> _userType;
        private readonly MainDbContext _dbContext;
        public AttendanceTypeService(IRepository<Attendance> userType, MainDbContext dbContext )
        {
            _userType = userType;
            _dbContext = dbContext;
        }
        public async Task<bool> Delete(int Id)
        {
            if (Id != null)
            {
                Attendance student = await _userType.Get(Id);
                if (student != null)
                {
                    return await _userType.Delete(student);
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

        public Task<Attendance> Find(Expression<Func<Attendance, bool>> match)
        {
            return _userType.Find(match);
        }

        public async Task<AttendanceViewModel> Get(int Id)
        {
            var result = await _userType.Get(Id);
            if (result == null)
                return null;
            else
            {
                AttendanceViewModel userTypeViewModel = new()
                {
                    Id = result.Id,
                    UserId = result.UserId,
                   
                    CheckInTime = DateTime.Now
             };
                return userTypeViewModel;
            }
        }

        public async Task<ICollection<AttendanceViewModel>> GetAll()
        {
            ICollection<AttendanceViewModel> userTypeViewModels = new List<AttendanceViewModel>();
            ICollection<Attendance> userTypes = await _userType.GetAll();
            foreach (Attendance userType in userTypes)
            {
                AttendanceViewModel userTypeView = new()
                {
                    Id = userType.Id,
                    UserId = userType.UserId,
                 
                  CheckInTime = DateTime.Now
                };
                userTypeViewModels.Add(userTypeView);
            }
            return userTypeViewModels;
        }

        public Attendance GetLast()
        {
            return _userType.GetLast();
        }

       

        public Task<bool> Insert(AttendanceInsertModel userInsertModel)
        {
            Attendance attendance = new()
            {
                UserId = userInsertModel.UserId,
               
                CheckInTime = DateTime.Now,
              
            };

            return _userType.Insert(attendance);
        }


        public async Task<bool> Update(AttendanceUpdateModel userUpdateModel)
        {
            Attendance userType = await _userType.Get(userUpdateModel.Id);
            if (userType != null)
            {
                userType.UserId = userUpdateModel.UserId;
               
                userType.CheckInTime = userUpdateModel.CheckInTime;
              

                var result = await _userType.Update(userType);
                return result;
            }
            else
                return false;
        }


        public async Task<(int LoginCount, UserViewModel UserDetails, List<DateTime> ClockInTimes)> GetLoginCountAndUserDetailsByUserId(int userId)
        {
            var user = await _dbContext.Users
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null)
                return (-1, null, null);

            var clockInTimes = await _dbContext.Attendances
                .Where(a => a.UserId == userId)
                .OrderBy(a => a.CheckInTime)
                .Select(a => a.CheckInTime)
                .ToListAsync();

            var loginCount = clockInTimes.Count;

            var userDetails = new UserViewModel
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                PhoneNo = user.PhoneNo,
            };

            return (loginCount, userDetails, clockInTimes);
        }


    }
}
