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
	                        c.[Name] AS CategoryName,
                            s.[Name] AS SizeName, s.[Id] AS SizeId, s.Abbreviation,
                            ps.Yards, ps.Id AS PatternSizeId,
                            pi.[Id] AS PatternImageId, pi.[Url] AS PatternImageUrl, pi.IsCover
                        FROM Pattern p
	                        LEFT JOIN Publisher pub ON p.PublisherId = pub.Id
	                        LEFT JOIN FabricType f ON p.FabricTypeId = f.Id
	                        LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN PatternSize ps ON p.Id = ps.PatternId
                            LEFT JOIN Size s ON s.Id = ps.SizeId
                            LEFT JOIN PatternImage pi ON pi.PatternId = p.Id
                        WHERE p.UserId = @UserId";
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var patterns = new List<Pattern>();
                    while (reader.Read())
                    {
                        var patternId = DbUtils.GetInt(reader, "Id");
                        var existingPattern = patterns.FirstOrDefault(p => p.Id == patternId);
                        if (existingPattern == null)
                        {
                            existingPattern = NewPatternFromDb(reader);

                            // lists for PatternSizes and Images
                            existingPattern.PatternSizes = new List<PatternSize>();
                            existingPattern.Images = new List<PatternImage>();
                            patterns.Add(existingPattern);
                        }

                        // populate pattern patternsizes list
                        if (DbUtils.IsNotDbNull(reader, "PatternSizeId"))
                        {
                            var patternSizeId = DbUtils.GetInt(reader, "PatternSizeId");
                            var existingPatternSize = existingPattern.PatternSizes.FirstOrDefault(ps => ps.Id == patternSizeId);
                            if (existingPatternSize == null)
                            {
                                existingPattern.PatternSizes.Add(new PatternSize()
                                {
                                    Id = DbUtils.GetInt(reader, "PatternSizeId"),
                                    SizeId = DbUtils.GetInt(reader, "SizeId"),
                                    PatternId = DbUtils.GetInt(reader, "Id"),
                                    Yards = DbUtils.GetDecimal(reader, "Yards"),
                                    Size = new Size()
                                    {
                                        Id = DbUtils.GetInt(reader, "SizeId"),
                                        Name = DbUtils.GetString(reader, "SizeName"),
                                        Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                                    }
                                });
                            }
                        }

                        // populate pattern images list
                        if (DbUtils.IsNotDbNull(reader, "PatternImageId"))
                        {
                            var patternImageId = DbUtils.GetInt(reader, "PatternImageId");
                            var existingPatternImage = existingPattern.Images.FirstOrDefault(pi => pi.Id == patternImageId);
                            if (existingPatternImage == null)
                            {
                                existingPattern.Images.Add(new PatternImage()
                                {
                                    Id = DbUtils.GetInt(reader, "PatternImageId"),
                                    PatternId = DbUtils.GetInt(reader, "Id"),
                                    IsCover = reader.GetBoolean(reader.GetOrdinal("IsCover")),
                                    Url = DbUtils.GetString(reader, "PatternImageUrl")
                                });
                            }
                        }
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
	                        c.[Name] AS CategoryName,
                            s.[Name] AS SizeName, s.[Id] AS SizeId, s.Abbreviation,
                            ps.Yards, ps.Id AS PatternSizeId,
                            pi.[Id] AS PatternImageId, pi.[Url] AS PatternImageUrl, pi.IsCover
                        FROM Pattern p
	                        LEFT JOIN Publisher pub ON p.PublisherId = pub.Id
	                        LEFT JOIN FabricType f ON p.FabricTypeId = f.Id
	                        LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN PatternSize ps ON p.Id = ps.PatternId
                            LEFT JOIN Size s ON s.Id = ps.SizeId
                            LEFT JOIN PatternImage pi ON pi.PatternId = p.Id 
                        WHERE p.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Pattern pattern = null;

                    while (reader.Read())
                    {
                        if (pattern == null)
                        {
                            pattern = NewPatternFromDb(reader);
                            pattern.PatternSizes = new List<PatternSize>();
                            pattern.Images = new List<PatternImage>();
                        }

                        if (DbUtils.IsNotDbNull(reader, "PatternSizeId"))
                        {
                            var patternSizeId = DbUtils.GetInt(reader, "PatternSizeId");
                            var existingPatternSize = pattern.PatternSizes.FirstOrDefault(ps => ps.Id == patternSizeId);
                            if (existingPatternSize == null)
                            {
                                pattern.PatternSizes.Add(new PatternSize()
                                {
                                    Id = DbUtils.GetInt(reader, "PatternSizeId"),
                                    SizeId = DbUtils.GetInt(reader, "SizeId"),
                                    PatternId = DbUtils.GetInt(reader, "Id"),
                                    Yards = DbUtils.GetDecimal(reader, "Yards"),
                                    Size = new Size()
                                    {
                                        Id = DbUtils.GetInt(reader, "SizeId"),
                                        Name = DbUtils.GetString(reader, "SizeName"),
                                        Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                                    }
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "PatternImageId"))
                        {
                            var patternImageId = DbUtils.GetInt(reader, "PatternImageId");
                            var existingPatternImage = pattern.Images.FirstOrDefault(pi => pi.Id == patternImageId);
                            if (existingPatternImage == null)
                            {
                                pattern.Images.Add(new PatternImage()
                                {
                                    Id = DbUtils.GetInt(reader, "PatternImageId"),
                                    PatternId = DbUtils.GetInt(reader, "Id"),
                                    IsCover = reader.GetBoolean(reader.GetOrdinal("IsCover")),
                                    Url = DbUtils.GetString(reader, "PatternImageUrl")
                                });
                            }
                        }
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
