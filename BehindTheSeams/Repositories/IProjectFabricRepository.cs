using BehindTheSeams.Models;

namespace BehindTheSeams.Repositories
{
    public interface IProjectFabricRepository
    {
        void Add(ProjectFabric projectFabric);
        void Delete(int id);
    }
}