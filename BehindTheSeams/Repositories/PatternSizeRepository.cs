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

        public List<PatternSize> GetByPatternId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ps.Id, ps.PatternId, ps.SizeId, ps.Yards, s.[Name], s.Abbreviation
                        FROM PatternSize ps
                        LEFT JOIN Size s on ps.SizeId = s.Id
                        WHERE ps.PatternId = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    var patternSizes = new List<PatternSize>();
                    while (reader.Read())
                    {
                        patternSizes.Add(new PatternSize()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PatternId = DbUtils.GetInt(reader, "PatternId"),
                            SizeId = DbUtils.GetInt(reader, "SizeId"),
                            Yards = DbUtils.GetDecimal(reader, "Yards"),
                            Size = new Size()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                            }
                        });
                    }
                    reader.Close();
                    return patternSizes;
                }
            }
        }

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
