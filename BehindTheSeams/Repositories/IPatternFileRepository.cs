using BehindTheSeams.Models;

namespace BehindTheSeams.Repositories
{
    public interface IPatternFileRepository
    {
        void Add(File file);
        void Delete(int id);
    }
}