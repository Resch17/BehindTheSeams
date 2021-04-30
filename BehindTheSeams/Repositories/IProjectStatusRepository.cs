using BehindTheSeams.Models;
using System.Collections.Generic;

namespace BehindTheSeams.Repositories
{
    public interface IProjectStatusRepository
    {
        List<ProjectStatus> GetAll();
        ProjectStatus GetById(int id);
    }
}