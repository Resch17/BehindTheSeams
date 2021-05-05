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
                            pi.[Id] AS PatternImageId, pi.[Url] AS PatternImageUrl, pi.IsCover,
                            fil.[Id] AS FileId, fil.[Name] AS FileName, fil.[Path] AS FilePath
                        FROM Pattern p
	                        LEFT JOIN Publisher pub ON p.PublisherId = pub.Id
	                        LEFT JOIN FabricType f ON p.FabricTypeId = f.Id
	                        LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN PatternSize ps ON p.Id = ps.PatternId
                            LEFT JOIN Size s ON s.Id = ps.SizeId
                            LEFT JOIN PatternImage pi ON pi.PatternId = p.Id
                            LEFT JOIN [File] fil ON fil.PatternId = p.Id
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

                            // lists for PatternSizes, PatternImages, and Files
                            existingPattern.PatternSizes = new List<PatternSize>();
                            existingPattern.Images = new List<PatternImage>();
                            existingPattern.Files = new List<File>();
                            patterns.Add(existingPattern);
                        }

                        // populate pattern PatternSizes list
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

                        if (DbUtils.IsNotDbNull(reader,"FileId"))
                        {
                            var fileId = DbUtils.GetInt(reader, "FileId");
                            var existingFile = existingPattern.Files.FirstOrDefault(f => f.Id == fileId);
                            if (existingFile == null)
                            {
                                existingPattern.Files.Add(new File()
                                {
                                    Id = fileId,
                                    PatternId = DbUtils.GetInt(reader, "Id"),
                                    Path = DbUtils.GetString(reader, "FilePath"),
                                    Name = DbUtils.GetString(reader, "FileName")
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
                            pi.[Id] AS PatternImageId, pi.[Url] AS PatternImageUrl, pi.IsCover,
                            fil.[Id] AS FileId, fil.[Name] AS FileName, fil.[Path] AS FilePath
                        FROM Pattern p
	                        LEFT JOIN Publisher pub ON p.PublisherId = pub.Id
	                        LEFT JOIN FabricType f ON p.FabricTypeId = f.Id
	                        LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN PatternSize ps ON p.Id = ps.PatternId
                            LEFT JOIN Size s ON s.Id = ps.SizeId
                            LEFT JOIN PatternImage pi ON pi.PatternId = p.Id 
                            LEFT JOIN [File] fil ON fil.PatternId = p.Id
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
                            pattern.Files = new List<File>();
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

                        if (DbUtils.IsNotDbNull(reader, "FileId"))
                        {
                            var fileId = DbUtils.GetInt(reader, "FileId");
                            var existingFile = pattern.Files.FirstOrDefault(f => f.Id == fileId);
                            if (existingFile == null)
                            {
                                pattern.Files.Add(new File()
                                {
                                    Id = fileId,
                                    PatternId = DbUtils.GetInt(reader, "Id"),
                                    Path = DbUtils.GetString(reader, "FilePath"),
                                    Name = DbUtils.GetString(reader, "FileName")
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

        public void Add(Pattern pattern)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Pattern ([UserId], [Url], [Name], [PublisherId], 
                                [PurchaseDate], [FabricTypeId], [Notes], [CategoryId])
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @Url, @Name, @PublisherId, @PurchaseDate, @FabricTypeId, @Notes, @CategoryId);";

                    DbUtils.AddParameter(cmd, "@UserId", pattern.UserId);
                    DbUtils.AddParameter(cmd, "@Url", pattern.Url);
                    DbUtils.AddParameter(cmd, "@Name", pattern.Name);
                    DbUtils.AddParameter(cmd, "@PublisherId", pattern.PublisherId);
                    DbUtils.AddParameter(cmd, "@PurchaseDate", pattern.PurchaseDate);
                    DbUtils.AddParameter(cmd, "@FabricTypeId", pattern.FabricTypeId);
                    DbUtils.AddParameter(cmd, "@Notes", pattern.Notes);
                    DbUtils.AddParameter(cmd, "@CategoryId", pattern.CategoryId);

                    pattern.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Pattern pattern)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Pattern
                            SET [Url] = @Url,
                                [Name] = @Name,
                                [PublisherId] = @PublisherId,
                                [PurchaseDate] = @PurchaseDate,
                                [FabricTypeId] = @FabricTypeId,
                                [Notes] = @Notes,
                                [CategoryId] = @CategoryId
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Url", pattern.Url);
                    DbUtils.AddParameter(cmd, "@Name", pattern.Name);
                    DbUtils.AddParameter(cmd, "@PublisherId", pattern.PublisherId);
                    DbUtils.AddParameter(cmd, "@PurchaseDate", pattern.PurchaseDate);
                    DbUtils.AddParameter(cmd, "@FabricTypeId", pattern.FabricTypeId);
                    DbUtils.AddParameter(cmd, "@Notes", pattern.Notes);
                    DbUtils.AddParameter(cmd, "@CategoryId", pattern.CategoryId);
                    DbUtils.AddParameter(cmd, "@Id", pattern.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id, List<Project> patternProjects)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"
                        DELETE PatternImage WHERE PatternId = @Id;
                        DELETE [File] WHERE PatternId = @Id;";

                    for (int i = 0; i < patternProjects.Count(); i++)
                    {
                        sql += @$"DELETE ProjectFabric WHERE ProjectId = @ProjectId{i};
                                  DELETE ProjectNotes WHERE ProjectId = @ProjectId{i};
                                  DELETE ProjectImage WHERE ProjectId = @ProjectId{i};
                                  DELETE Project WHERE Id = @ProjectId{i};";
                        DbUtils.AddParameter(cmd, $"ProjectId{i}", patternProjects[i].Id);
                    }
                    sql += @"DELETE PatternSize WHERE PatternId = @Id;
                             DELETE Pattern WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.CommandText = sql;
                    cmd.ExecuteNonQuery();
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
                PublisherId = DbUtils.GetInt(reader, "PublisherId"),
                Publisher = new Publisher()
                {
                    Id = DbUtils.GetInt(reader, "PublisherId"),
                    Name = DbUtils.GetString(reader, "PublisherName"),
                    Url = DbUtils.GetString(reader, "PublisherUrl")
                },
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
