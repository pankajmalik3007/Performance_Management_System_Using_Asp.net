
using System.Linq.Expressions;

using Infra_Library.Repositories;
using Domain_Library;

namespace RepositoryAndServices.Services.GeneralServices
{
    public class Services<T> : IServices<T> where T : BaseEntity
    {
        #region Property
        private readonly IRepository<T> _repository;

        #endregion

        public Services(IRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task<bool> Delete(T entity)
        {
            return await _repository.Delete(entity);
        }

        public Task<T> Get(int Id)
        {
            return _repository.Get(Id);
        }
        public T GetLast()
        {
            return _repository.GetLast();
        }


        public Task<ICollection<T>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<bool> Insert(T entity)
        {
            return _repository.Insert(entity);
        }

        public Task<bool> Update(T entity)
        {
            return _repository.Update(entity);
        }
        public Task<T> Find(Expression<Func<T, bool>> match)
        {
            return _repository.Find(match);
        }
        public Task<ICollection<T>> FindAll(Expression<Func<T, bool>> match)
        {
            return _repository.FindAll(match);
        }
    }
}
