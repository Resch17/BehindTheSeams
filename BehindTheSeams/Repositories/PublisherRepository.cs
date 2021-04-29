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
    public class PublisherRepository : BaseRepository, IPublisherRepository
    {
        public PublisherRepository(IConfiguration configuration) : base(configuration) { }

        public List<Publisher> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name], [Url]
                        FROM Publisher";
                    var reader = cmd.ExecuteReader();
                    var publishers = new List<Publisher>();
                    while (reader.Read())
                    {
                        publishers.Add(NewPublisherFromDb(reader));
                    }
                    reader.Close();
                    return publishers;
                }
            }
        }

        public Publisher GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name], [Url]
                            FROM Publisher
                        WHERE [Id] = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    Publisher publisher = null;
                    while (reader.Read())
                    {
                        if (publisher == null)
                        {
                            publisher = NewPublisherFromDb(reader);
                        }
                    }
                    reader.Close();
                    return publisher;
                }
            }
        }

        private Publisher NewPublisherFromDb(SqlDataReader reader)
        {
            return new Publisher()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                Url = DbUtils.GetString(reader, "Url")
            };
        }
    }
}
