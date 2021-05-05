using BehindTheSeams.Models;
using BehindTheSeams.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Repositories
{
    public class PatternImageRepository : BaseRepository, IPatternImageRepository
    {
        public PatternImageRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(PatternImage patternImage)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PatternImage (Url, PatternId)
                        OUTPUT INSERTED.ID
                        VALUES (@Url, @PatternId)";
                    DbUtils.AddParameter(cmd, "@Url", patternImage.Url);
                    DbUtils.AddParameter(cmd, "@PatternId", patternImage.PatternId);

                    patternImage.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
