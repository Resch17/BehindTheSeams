using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);
        List<User> GetAll();
        User GetByFirebaseUserId(string firebaseUserId);
        User GetByUserId(int id);
    }
}