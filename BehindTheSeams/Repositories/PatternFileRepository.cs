using BehindTheSeams.Models;
using BehindTheSeams.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Repositories
{
    public class PatternFileRepository : BaseRepository, IPatternFileRepository
    {
        public PatternFileRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(File file)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [File] ([Name], [Path], [PatternId]
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Path, @PatternId)";
                    DbUtils.AddParameter(cmd, "@Name", file.Name);
                    DbUtils.AddParameter(cmd, "@Path", file.Path);
                    DbUtils.AddParameter(cmd, "@PatternId", file.PatternId);

                    file.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
