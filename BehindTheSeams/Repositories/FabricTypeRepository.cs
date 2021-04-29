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
    public class FabricTypeRepository : BaseRepository, IFabricTypeRepository
    {
        public FabricTypeRepository(IConfiguration configuration) : base(configuration) { }

        public List<FabricType> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name]
                        FROM FabricType";
                    var reader = cmd.ExecuteReader();
                    var fabricTypes = new List<FabricType>();
                    while (reader.Read())
                    {
                        fabricTypes.Add(NewFabricTypeFromDb(reader));
                    }
                    reader.Close();
                    return fabricTypes;
                }
            }
        }

        public FabricType GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name]
                            FROM FabricType
                        WHERE [Id] = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    FabricType fabricType = null;
                    while (reader.Read())
                    {
                        if (fabricType == null)
                        {
                            fabricType = NewFabricTypeFromDb(reader);
                        }
                    }
                    reader.Close();
                    return fabricType;
                }
            }
        }


        private FabricType NewFabricTypeFromDb(SqlDataReader reader)
        {
            return new FabricType()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }
    }
}
