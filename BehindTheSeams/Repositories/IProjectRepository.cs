using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IProjectRepository
    {
        List<Project> GetAll(int userId);
        Project GetById(int id);
    }
}