using Domain_Library.ViewModels;
using Domain_Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infra_Library.Services.CustomeServices
{
    public interface IUserTypeService
    {
        Task<ICollection<UserTypeViewModels>> GetAll();
        Task<UserTypeViewModels> Get(int Id);
        UserType GetLast();
        Task<bool> Insert(UserTypeInsertModel userInsertModel);
        Task<bool> Update(UserTypeUpdateModel userUpdateModel);
        Task<bool> Delete(int Id);
        Task<UserType> Find(Expression<Func<UserType, bool>> match);
    }
}
