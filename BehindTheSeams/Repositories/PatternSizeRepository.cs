using BehindTheSeams.Models;
using BehindTheSeams.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Repositories
{
    public class PatternSizeRepository : BaseRepository, IPatternSizeRepository
    {
        public PatternSizeRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(PatternSize patternSize)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO PatternSize (PatternId, SizeId, Yards)
                        OUTPUT INSERTED.ID
                        VALUES (@PatternId, @SizeId, @Yards)";
                    DbUtils.AddParameter(cmd, "@PatternId", patternSize.PatternId);
                    DbUtils.AddParameter(cmd, "@SizeId", patternSize.SizeId);
                    DbUtils.AddParameter(cmd, "@Yards", patternSize.Yards);

                    patternSize.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
