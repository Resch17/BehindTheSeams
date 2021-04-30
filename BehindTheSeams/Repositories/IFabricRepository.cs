using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IFabricRepository
    {
        List<Fabric> GetAll(int userId);
        Fabric GetById(int id);
        void Add(Fabric fabric);
        void Delete(int id);
        void Update(Fabric fabric);
    }
}