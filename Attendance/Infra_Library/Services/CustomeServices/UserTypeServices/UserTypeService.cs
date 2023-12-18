using Domain_Library;
using Domain_Library.ViewModels;
using Infra_Library.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infra_Library.Services.CustomeServices
{
    public class UserTypeService : IUserTypeService
    {
        private readonly IRepository<UserType> _userType;
        public UserTypeService(IRepository<UserType> userType)
        {
            _userType = userType;
        }

        public async Task<ICollection<UserTypeViewModels>> GetAll()
        {
            ICollection<UserTypeViewModels> userTypeViewModels = new List<UserTypeViewModels>();
            ICollection<UserType> userTypes = await _userType.GetAll();
            foreach (UserType userType in userTypes)
            {
                UserTypeViewModels userTypeView = new()
                {
                    Id = userType.Id,
                    Type = userType.Type
                };
                userTypeViewModels.Add(userTypeView);
            }
            return userTypeViewModels;
        }

        public async Task<bool> Delete(int id)
        {
            if (id != null)
            {
                UserType student = await _userType.Get(id);
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

        public async Task<UserTypeViewModels> Get(int Id)
        {
            var result = await _userType.Get(Id);
            if (result == null)
                return null;
            else
            {
                UserTypeViewModels userTypeViewModel = new()
                {
                    Id = result.Id,
                    Type = result.Type
                };
                return userTypeViewModel;
            }
        }

        public UserType GetLast()
        {
            return _userType.GetLast();
        }

        public Task<bool> Insert(UserTypeInsertModel userInsertModel)
        {
            UserType userType = new()
            {
                Type= userInsertModel.Type,
              
            };
            return _userType.Insert(userType);
        }

        public async Task<bool> Update(UserTypeUpdateModel userUpdateModel)
        {
            UserType userType = await _userType.Get(userUpdateModel.Id);
            if (userType != null)
            {
                userType.Type = userUpdateModel.Type;
               
                var result = await _userType.Update(userType);
                return result;
            }
            else
                return false;
        }
        public Task<UserType> Find(Expression<Func<UserType, bool>> match)
        {
            return _userType.Find(match);
        }
    }
}
