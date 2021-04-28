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
    public class PatternRepository : BaseRepository, IPatternRepository
    {
        public PatternRepository(IConfiguration configuration) : base(configuration) { }

        public List<Pattern> GetAll(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.UserId, p.[Url], p.[Name], p.PublisherId, p.PurchaseDate, p.FabricTypeId, p.Notes, p.CategoryId,
	                        pub.[Name] AS PublisherName, pub.[Url] AS PublisherUrl,
	                        f.[Name] AS FabricTypeName,
	                        c.[Name] AS CategoryName
                        FROM Pattern p
	                        LEFT JOIN Publisher pub ON p.PublisherId = pub.Id
	                        LEFT JOIN FabricType f ON p.FabricTypeId = f.Id
	                        LEFT JOIN Category c ON p.CategoryId = c.Id
                        WHERE p.UserId = @UserId";
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var patterns = new List<Pattern>();
                    while (reader.Read())
                    {
                        patterns.Add(NewPatternFromDb(reader));
                    }
                    reader.Close();
                    return patterns;
                }
            }
        }

        public Pattern GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.UserId, p.[Url], p.[Name], p.PublisherId, p.PurchaseDate, p.FabricTypeId, p.Notes, p.CategoryId,
	                        pub.[Name] AS PublisherName, pub.[Url] AS PublisherUrl,
	                        f.[Name] AS FabricTypeName,
	                        c.[Name] AS CategoryName
                        FROM Pattern p
	                        LEFT JOIN Publisher pub ON p.PublisherId = pub.Id
	                        LEFT JOIN FabricType f ON p.FabricTypeId = f.Id
	                        LEFT JOIN Category c ON p.CategoryId = c.Id
                        WHERE p.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    Pattern pattern = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        pattern = NewPatternFromDb(reader);
                    }
                    reader.Close();

                    return pattern;
                }
            }
        }

        private Pattern NewPatternFromDb(SqlDataReader reader)
        {
            return new Pattern()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                Url = DbUtils.GetString(reader, "Url"),
                Name = DbUtils.GetString(reader, "Name"),
                PurchaseDate = DbUtils.GetDateTime(reader, "PurchaseDate"),
                FabricTypeId = DbUtils.GetInt(reader, "FabricTypeId"),
                FabricType = new FabricType()
                {
                    Id = DbUtils.GetInt(reader, "FabricTypeId"),
                    Name = DbUtils.GetString(reader, "FabricTypeName"),
                },
                Notes = DbUtils.GetString(reader, "Notes"),
                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                Category = new Category()
                {
                    Id = DbUtils.GetInt(reader, "CategoryId"),
                    Name = DbUtils.GetString(reader, "CategoryName")
                }
            };
        }
    }
}
