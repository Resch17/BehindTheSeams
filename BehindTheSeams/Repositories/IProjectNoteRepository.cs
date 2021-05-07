using BehindTheSeams.Models;

namespace BehindTheSeams.Repositories
{
    public interface IProjectNoteRepository
    {
        void Add(ProjectNotes projectNote);
        void Delete(int noteId);
    }
}