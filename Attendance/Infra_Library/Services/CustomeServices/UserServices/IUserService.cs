
using Domain_Library;
using Domain_Library.ViewModels;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static Domain_Library.ViewModels.LeaveViewModel;

namespace RepositoryAndServices.Services
{
    public interface IUserService
    {
        
        Task<ICollection<UserViewModel>> GetAll();
        Task<UserViewModel> Get(int Id);
        User GetLast();
        Task<bool> Insert(UserInsertModel userInsertModel);
        Task<bool> Update(UserUpdateModel userUpdateModel);
        Task<bool> Delete(int Id);
        Task<User> Find(Expression<Func<User, bool>> match);
        Task InitializeUsers();
    }
}
