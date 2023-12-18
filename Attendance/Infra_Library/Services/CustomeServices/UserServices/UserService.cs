
using Domain_Library.ViewModels;
using Infra_Library.Common;
using Infra_Library.Repositories;

using System.Linq.Expressions;


namespace RepositoryAndServices.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userType;
        public UserService(IRepository<User> userType)
        {
            _userType = userType;
        }

        public async Task<bool> Delete(int Id)
        {
            if (Id != null)
            {
                User student = await _userType.Get(Id);
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

        public Task<User> Find(Expression<Func<User, bool>> match)
        {
            return _userType.Find(match);
        }

      
          public async Task<UserViewModel> Get(int Id)
          {
              var result = await _userType.Get(Id);
              if (result == null)
                  return null;
              else
              {
                  UserViewModel userTypeViewModel = new()
                  {
                      Id = result.Id,
                      Username = result.Username,
                      Password = Encryptor.DecryptString(result.Password),
                      Email = result.Email,
                      PhoneNo = result.PhoneNo,
                      Adress = result.Adress,
                      Role= result.Role
                     
                  };
                  return userTypeViewModel;
              }
          }

          public async Task<ICollection<UserViewModel>> GetAll()
          {
              ICollection<UserViewModel> userTypeViewModels = new List<UserViewModel>();
              ICollection<User> userTypes = await _userType.GetAll();
              foreach (User userType in userTypes)
              {
                  UserViewModel userTypeView = new()
                  {
                      Id = userType.Id,
                      Username = userType.Username,
                      Password = Encryptor.DecryptString(userType.Password),
                      Email = userType.Email,
                      PhoneNo = userType.PhoneNo,
                      Adress = userType.Adress,
                      Role = userType.Role
                        
                  };
                  userTypeViewModels.Add(userTypeView);
              }
              return userTypeViewModels;
          }
  
       

        public User GetLast()
        {
            return _userType.GetLast();
        }

        public Task<bool> Insert(UserInsertModel userInsertModel)
        {
            User userType = new()
            {
                Username = userInsertModel.Username,
                Password = Encryptor.EncryptString(userInsertModel.Password),
                Email = userInsertModel.Email,
                PhoneNo = userInsertModel.PhoneNo,
                Adress = userInsertModel.Adress,
                UserTypeId = userInsertModel.UserTypeId,
               Role = userInsertModel.Role

            };
            return _userType.Insert(userType);
        }

        public async Task<bool> Update(UserUpdateModel userUpdateModel)
        {
            User userType = await _userType.Get(userUpdateModel.Id);
            if (userType != null)
            {
                userType.Username = userUpdateModel.Username;
                userType.Password = Encryptor.DecryptString(userUpdateModel.Password);
                userType.Email = userUpdateModel.Email;
                userType.PhoneNo = userUpdateModel.PhoneNo;
                userType.Adress = userUpdateModel.Adress;
                userType.UserTypeId = userUpdateModel.UserTypeId;
                userType.Role = userUpdateModel.Role;
                var result = await _userType.Update(userType);
                return result;
            }
            else
                return false;
        }
        public async Task InitializeUsers()
        {
            var employeeUserType = await _userType.Find(ut => ut.Role == "Employee");
            var hrUserType = await _userType.Find(ut => ut.Role == "HR");

            if (employeeUserType == null)
            {
                employeeUserType = new User { Role = "Employee", UserTypeId = 2  };
                await _userType.Insert(employeeUserType);
            }

            if (hrUserType == null)
            {
                hrUserType = new User { Role = "HR", UserTypeId = 1  };
                await _userType.Insert(hrUserType);
            }
        }

    }

}

   

