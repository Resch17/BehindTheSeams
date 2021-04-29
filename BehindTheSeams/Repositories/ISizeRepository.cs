using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface ISizeRepository
    {
        List<Size> GetAllSizes();
        Size GetById(int id);
    }
}