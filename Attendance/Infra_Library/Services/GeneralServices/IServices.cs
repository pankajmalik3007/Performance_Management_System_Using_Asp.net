using System.Linq.Expressions;

namespace RepositoryAndServices.Services.GeneralServices
{
    public interface IServices<T>
    {
        Task<ICollection<T>> GetAll();
        Task<T> Get(int Id);
        T GetLast();
        Task<bool> Insert(T entity);
        Task<bool> Update(T entity);
        Task<bool> Delete(T entity);
        Task<T> Find(Expression<Func<T, bool>> match);
        Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match);
    }
}
