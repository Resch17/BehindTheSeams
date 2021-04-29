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
    public class RetailerRepository : BaseRepository, IRetailerRepository
    {
        public RetailerRepository(IConfiguration configuration) : base(configuration) { }

        public List<Retailer> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name], [Url]
                        FROM Retailer";
                    var reader = cmd.ExecuteReader();
                    var retailers = new List<Retailer>();
                    while (reader.Read())
                    {
                        retailers.Add(NewRetailerFromDb(reader));
                    }
                    reader.Close();
                    return retailers;
                }
            }
        }

        public Retailer GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name], [Url]
                            FROM Retailer
                        WHERE [Id] = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Retailer retailer = null;
                    while (reader.Read())
                    {
                        if (retailer == null)
                        {
                            retailer = NewRetailerFromDb(reader);
                        }
                    }
                    reader.Close();
                    return retailer;
                }
            }
        }


        private Retailer NewRetailerFromDb(SqlDataReader reader)
        {
            return new Retailer()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Url = DbUtils.GetString(reader, "Url")
            };
        }
    }
}
