using BehindTheSeams.Models;
using BehindTheSeams.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Repositories
{
    public class ProjectNoteRepository : BaseRepository, IProjectNoteRepository
    {
        public ProjectNoteRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(ProjectNotes projectNote)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ProjectNotes (ProjectId, Text)
                        OUTPUT INSERTED.ID
                        VALUES (@ProjectId, @Text)";
                    DbUtils.AddParameter(cmd, "@ProjectId", projectNote.ProjectId);
                    DbUtils.AddParameter(cmd, "@Text", projectNote.Text);

                    projectNote.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int noteId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE ProjectNotes
                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", noteId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
