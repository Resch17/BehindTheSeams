using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IPatternRepository
    {
        List<Pattern> GetAll(int userId);
        Pattern GetById(int id);
    }
}