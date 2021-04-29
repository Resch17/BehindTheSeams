using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IFabricTypeRepository
    {
        List<FabricType> GetAll();
        FabricType GetById(int id);
    }
}