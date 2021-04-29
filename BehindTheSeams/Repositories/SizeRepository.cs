using BehindTheSeams.Models;
using BehindTheSeams.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Repositories
{
    public class SizeRepository : BaseRepository, ISizeRepository
    {
        public SizeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Size> GetAllSizes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name], [Abbreviation]
                        FROM Size";
                    var reader = cmd.ExecuteReader();
                    var sizes = new List<Size>();
                    while (reader.Read())
                    {
                        sizes.Add(NewSizeFromDb(reader));
                    }
                    reader.Close();
                    return sizes;
                }
            }
        }

        public Size GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name], [Abbreviation]
                            FROM Size
                        WHERE [Id] = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Size size = null;
                    while (reader.Read())
                    {
                        if (size == null)
                        {
                            size = NewSizeFromDb(reader);
                        }
                    }
                    reader.Close();
                    return size;
                }
            }
        }

        private Size NewSizeFromDb(SqlDataReader reader)
        {
            return new Size()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Abbreviation = DbUtils.GetString(reader, "Abbreviation")
            };
        }
    }
}
