using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IFabricRepository
    {
        List<Fabric> GetAll(int userId);
        Fabric GetById(int id);
    }
}