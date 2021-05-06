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
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }

        public List<Project> GetAll(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.[Id], p.[Name], p.[UserId], p.[PatternId], p.[PatternSizeId], 
							p.[IsComplete], p.[ProjectStatusId], 
							pstatus.[Name] AS ProjectStatus,
							p.[CreateDateTime],
							pat.[Name] AS [PatternName],
							n.[Id] AS NoteId, n.[Text] AS NoteText,
							patsize.[Yards], s.[Name] AS SizeName, s.[Abbreviation],
							patimg.[Id] AS PatternImageId, patimg.[IsCover], patimg.[Url] AS PatternImageUrl,
							f.[Id] AS FabricId, f.[Name] AS FabricName, ft.[Name] AS FabricTypeName, f.[PricePerYard],
							f.[YardsInStock], r.[Name] AS RetailerName, r.[Url] AS RetailerUrl,
							fi.[Url] AS FabricImageUrl, fi.[FabricId] AS ImageFabricId
						FROM Project p
							LEFT JOIN Pattern pat ON pat.Id = p.PatternId
							LEFT JOIN ProjectStatus pstatus ON p.ProjectStatusId = pstatus.Id
							LEFT JOIN PatternImage patimg ON pat.Id = patimg.PatternId
							LEFT JOIN ProjectNotes n ON n.ProjectId = p.Id
							LEFT JOIN PatternSize patsize ON patsize.Id = p.PatternSizeId
							LEFT JOIN Size s ON s.Id = patsize.SizeId
							LEFT JOIN ProjectFabric pf ON pf.ProjectId = p.Id
							LEFT JOIN Fabric f ON f.Id = pf.FabricId
							LEFT JOIN FabricType ft ON ft.Id = f.FabricTypeId
							LEFT JOIN Retailer r ON r.Id = f.RetailerId
							LEFT JOIN FabricImage fi ON fi.FabricId = f.Id
						WHERE p.UserId = @UserId AND p.IsComplete = 0";
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var projects = new List<Project>();
                    while (reader.Read())
                    {
                        var projectId = DbUtils.GetInt(reader, "Id");
                        var existingProject = projects.FirstOrDefault(p => p.Id == projectId);
                        if (existingProject == null)
                        {
                            existingProject = NewProjectFromDb(reader);

                            existingProject.Notes = new List<ProjectNotes>();
                            existingProject.Fabric = new List<Fabric>();

                            projects.Add(existingProject);
                        }

                        if (DbUtils.IsNotDbNull(reader, "NoteId"))
                        {
                            var noteId = DbUtils.GetInt(reader, "NoteId");
                            var existingNote = existingProject.Notes.FirstOrDefault(n => n.Id == noteId);
                            if (existingNote == null)
                            {
                                existingProject.Notes.Add(new ProjectNotes()
                                {
                                    Id = DbUtils.GetInt(reader, "NoteId"),
                                    ProjectId = DbUtils.GetInt(reader, "Id"),
                                    Text = DbUtils.GetString(reader, "NoteText")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "FabricId"))
                        {
                            var fabricId = DbUtils.GetInt(reader, "FabricId");
                            var existingFabric = existingProject.Fabric.FirstOrDefault(f => f.Id == fabricId);
                            if (existingFabric == null)
                            {
                                existingProject.Fabric.Add(new Fabric()
                                {
                                    Id = DbUtils.GetInt(reader, "FabricId"),
                                    Name = DbUtils.GetString(reader, "FabricName"),
                                    PricePerYard = DbUtils.GetDecimal(reader, "PricePerYard"),
                                    Images = new List<FabricImage>(),
                                    FabricType = new FabricType()
                                    {
                                        Name = DbUtils.GetString(reader, "FabricTypeName")
                                    },
                                    YardsInStock = DbUtils.GetDecimal(reader, "YardsInStock"),
                                    Retailer = new Retailer()
                                    {
                                        Name = DbUtils.GetString(reader, "RetailerName"),
                                        Url = DbUtils.GetString(reader, "RetailerUrl")
                                    }
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "PatternImageId"))
                        {
                            var patternImageId = DbUtils.GetInt(reader, "PatternImageId");
                            var exisitingPatternImage = existingProject.Pattern.Images.FirstOrDefault(pi => pi.Id == patternImageId);
                            if (exisitingPatternImage == null)
                            {
                                existingProject.Pattern.Images.Add(new PatternImage()
                                {
                                    Id = patternImageId,
                                    Url = DbUtils.GetString(reader, "PatternImageUrl"),
                                    IsCover = reader.GetBoolean(reader.GetOrdinal("IsCover")),
                                    PatternId = DbUtils.GetInt(reader, "PatternId")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "FabricImageUrl"))
                        {
                            var fabricImageUrl = DbUtils.GetString(reader, "FabricImageUrl");
                            var existingFabricImage = existingProject.Fabric.FirstOrDefault(f => f.Images.FirstOrDefault(fi => fi.Url == fabricImageUrl) != null);
                            if (existingFabricImage == null)
                            {
                                var fabricForImage = existingProject.Fabric.FirstOrDefault(f => f.Id == DbUtils.GetInt(reader, "ImageFabricId"));
                                fabricForImage.Images.Add(new FabricImage()
                                {
                                    Url = fabricImageUrl
                                });
                            }
                        }
                    }
                    reader.Close();
                    return projects;
                }
            }
        }

        public List<Project> GetAllComplete(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.[Id], p.[Name], p.[UserId], p.[PatternId], p.[PatternSizeId], 
							p.[IsComplete], p.[ProjectStatusId], 
							pstatus.[Name] AS ProjectStatus,
							p.[CreateDateTime],
							pat.[Name] AS [PatternName],
							n.[Id] AS NoteId, n.[Text] AS NoteText,
							patsize.[Yards], s.[Name] AS SizeName, s.[Abbreviation],
							patimg.[Id] AS PatternImageId, patimg.[IsCover], patimg.[Url] AS PatternImageUrl,
							f.[Id] AS FabricId, f.[Name] AS FabricName, ft.[Name] AS FabricTypeName, f.[PricePerYard],
							f.[YardsInStock], r.[Name] AS RetailerName, r.[Url] AS RetailerUrl,
							fi.[Url] AS FabricImageUrl, fi.[FabricId] AS ImageFabricId
						FROM Project p
							LEFT JOIN Pattern pat ON pat.Id = p.PatternId
							LEFT JOIN ProjectStatus pstatus ON p.ProjectStatusId = pstatus.Id
							LEFT JOIN PatternImage patimg ON pat.Id = patimg.PatternId
							LEFT JOIN ProjectNotes n ON n.ProjectId = p.Id
							LEFT JOIN PatternSize patsize ON patsize.Id = p.PatternSizeId
							LEFT JOIN Size s ON s.Id = patsize.SizeId
							LEFT JOIN ProjectFabric pf ON pf.ProjectId = p.Id
							LEFT JOIN Fabric f ON f.Id = pf.FabricId
							LEFT JOIN FabricType ft ON ft.Id = f.FabricTypeId
							LEFT JOIN Retailer r ON r.Id = f.RetailerId
							LEFT JOIN FabricImage fi ON fi.FabricId = f.Id
						WHERE p.UserId = @UserId AND p.IsComplete = 1";
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var projects = new List<Project>();
                    while (reader.Read())
                    {
                        var projectId = DbUtils.GetInt(reader, "Id");
                        var existingProject = projects.FirstOrDefault(p => p.Id == projectId);
                        if (existingProject == null)
                        {
                            existingProject = NewProjectFromDb(reader);

                            existingProject.Notes = new List<ProjectNotes>();
                            existingProject.Fabric = new List<Fabric>();

                            projects.Add(existingProject);
                        }

                        if (DbUtils.IsNotDbNull(reader, "NoteId"))
                        {
                            var noteId = DbUtils.GetInt(reader, "NoteId");
                            var existingNote = existingProject.Notes.FirstOrDefault(n => n.Id == noteId);
                            if (existingNote == null)
                            {
                                existingProject.Notes.Add(new ProjectNotes()
                                {
                                    Id = DbUtils.GetInt(reader, "NoteId"),
                                    ProjectId = DbUtils.GetInt(reader, "Id"),
                                    Text = DbUtils.GetString(reader, "NoteText")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "FabricId"))
                        {
                            var fabricId = DbUtils.GetInt(reader, "FabricId");
                            var existingFabric = existingProject.Fabric.FirstOrDefault(f => f.Id == fabricId);
                            if (existingFabric == null)
                            {
                                existingProject.Fabric.Add(new Fabric()
                                {
                                    Id = DbUtils.GetInt(reader, "FabricId"),
                                    Name = DbUtils.GetString(reader, "FabricName"),
                                    PricePerYard = DbUtils.GetDecimal(reader, "PricePerYard"),
                                    Images = new List<FabricImage>(),
                                    FabricType = new FabricType()
                                    {
                                        Name = DbUtils.GetString(reader, "FabricTypeName")
                                    },
                                    YardsInStock = DbUtils.GetDecimal(reader, "YardsInStock"),
                                    Retailer = new Retailer()
                                    {
                                        Name = DbUtils.GetString(reader, "RetailerName"),
                                        Url = DbUtils.GetString(reader, "RetailerUrl")
                                    }
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "PatternImageId"))
                        {
                            var patternImageId = DbUtils.GetInt(reader, "PatternImageId");
                            var exisitingPatternImage = existingProject.Pattern.Images.FirstOrDefault(pi => pi.Id == patternImageId);
                            if (exisitingPatternImage == null)
                            {
                                existingProject.Pattern.Images.Add(new PatternImage()
                                {
                                    Id = patternImageId,
                                    Url = DbUtils.GetString(reader, "PatternImageUrl"),
                                    IsCover = reader.GetBoolean(reader.GetOrdinal("IsCover")),
                                    PatternId = DbUtils.GetInt(reader, "PatternId")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "FabricImageUrl"))
                        {
                            var fabricImageUrl = DbUtils.GetString(reader, "FabricImageUrl");
                            var existingFabricImage = existingProject.Fabric.FirstOrDefault(f => f.Images.FirstOrDefault(fi => fi.Url == fabricImageUrl) != null);
                            if (existingFabricImage == null)
                            {
                                var fabricForImage = existingProject.Fabric.FirstOrDefault(f => f.Id == DbUtils.GetInt(reader, "ImageFabricId"));
                                fabricForImage.Images.Add(new FabricImage()
                                {
                                    Url = fabricImageUrl
                                });
                            }
                        }
                    }
                    reader.Close();
                    return projects;
                }
            }
        }

        public Project GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.[Id], p.[Name], p.[UserId], p.[PatternId], p.[PatternSizeId], 
							p.[IsComplete], p.[ProjectStatusId], 
							pstatus.[Name] AS ProjectStatus,
							p.[CreateDateTime],
							pat.[Name] AS [PatternName],
							n.[Id] AS NoteId, n.[Text] AS NoteText,
							patsize.[Yards], s.[Name] AS SizeName, s.[Abbreviation],
							patimg.[Id] AS PatternImageId, patimg.[IsCover], patimg.[Url] AS PatternImageUrl,
							f.[Id] AS FabricId, f.[Name] AS FabricName, ft.[Name] AS FabricTypeName, f.[PricePerYard],
							f.[YardsInStock], r.[Name] AS RetailerName, r.[Url] AS RetailerUrl,
							fi.[Url] AS FabricImageUrl, fi.[FabricId] AS ImageFabricId
						FROM Project p
							LEFT JOIN Pattern pat ON pat.Id = p.PatternId
							LEFT JOIN ProjectStatus pstatus ON p.ProjectStatusId = pstatus.Id
							LEFT JOIN PatternImage patimg ON pat.Id = patimg.PatternId
							LEFT JOIN ProjectNotes n ON n.ProjectId = p.Id
							LEFT JOIN PatternSize patsize ON patsize.Id = p.PatternSizeId
							LEFT JOIN Size s ON s.Id = patsize.SizeId
							LEFT JOIN ProjectFabric pf ON pf.ProjectId = p.Id
							LEFT JOIN Fabric f ON f.Id = pf.FabricId
							LEFT JOIN FabricType ft ON ft.Id = f.FabricTypeId
							LEFT JOIN Retailer r ON r.Id = f.RetailerId
							LEFT JOIN FabricImage fi ON fi.FabricId = f.Id
						WHERE p.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Project project = null;

                    while (reader.Read())
                    {
                        if (project == null)
                        {
                            project = NewProjectFromDb(reader);
                            project.Notes = new List<ProjectNotes>();
                            project.Fabric = new List<Fabric>();
                        }

                        if (DbUtils.IsNotDbNull(reader, "NoteId"))
                        {
                            var noteId = DbUtils.GetInt(reader, "NoteId");
                            var existingNote = project.Notes.FirstOrDefault(n => n.Id == noteId);
                            if (existingNote == null)
                            {
                                project.Notes.Add(new ProjectNotes()
                                {
                                    Id = DbUtils.GetInt(reader, "NoteId"),
                                    ProjectId = DbUtils.GetInt(reader, "Id"),
                                    Text = DbUtils.GetString(reader, "NoteText")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "FabricId"))
                        {
                            var fabricId = DbUtils.GetInt(reader, "FabricId");
                            var existingFabric = project.Fabric.FirstOrDefault(f => f.Id == fabricId);
                            if (existingFabric == null)
                            {
                                project.Fabric.Add(new Fabric()
                                {
                                    Id = DbUtils.GetInt(reader, "FabricId"),
                                    Name = DbUtils.GetString(reader, "FabricName"),
                                    PricePerYard = DbUtils.GetDecimal(reader, "PricePerYard"),
                                    Images = new List<FabricImage>(),
                                    FabricType = new FabricType()
                                    {
                                        Name = DbUtils.GetString(reader, "FabricTypeName")
                                    },
                                    YardsInStock = DbUtils.GetDecimal(reader, "YardsInStock"),
                                    Retailer = new Retailer()
                                    {
                                        Name = DbUtils.GetString(reader, "RetailerName"),
                                        Url = DbUtils.GetString(reader, "RetailerUrl")
                                    }
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "PatternImageId"))
                        {
                            var patternImageId = DbUtils.GetInt(reader, "PatternImageId");
                            var existingPatternImage = project.Pattern.Images.FirstOrDefault(pi => pi.Id == patternImageId);
                            if (existingPatternImage == null)
                            {
                                project.Pattern.Images.Add(new PatternImage()
                                {
                                    Id = patternImageId,
                                    Url = DbUtils.GetString(reader, "PatternImageUrl"),
                                    IsCover = reader.GetBoolean(reader.GetOrdinal("IsCover")),
                                    PatternId = DbUtils.GetInt(reader, "PatternId")
                                });
                            }
                        }

                        if (DbUtils.IsNotDbNull(reader, "FabricImageUrl"))
                        {
                            var fabricImageUrl = DbUtils.GetString(reader, "FabricImageUrl");
                            var existingFabricImage = project.Fabric.FirstOrDefault(f => f.Images.FirstOrDefault(fi => fi.Url == fabricImageUrl) != null);
                            if (existingFabricImage == null)
                            {
                                var fabricForImage = project.Fabric.FirstOrDefault(f => f.Id == DbUtils.GetInt(reader, "ImageFabricId"));
                                fabricForImage.Images.Add(new FabricImage()
                                {
                                    Url = fabricImageUrl
                                });
                            }
                        }
                    }
                    reader.Close();

                    return project;
                }
            }
        }

        public void Add(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Project ([Name], UserId, PatternId, ProjectStatusId,
                            CreateDateTime, PatternSizeId)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @UserId, @PatternId, 1, SYSDATETIME(), @PatternSizeId)";
                    DbUtils.AddParameter(cmd, "@Name", project.Name);
                    DbUtils.AddParameter(cmd, "@UserId", project.UserId);
                    DbUtils.AddParameter(cmd, "@PatternId", project.PatternId);
                    DbUtils.AddParameter(cmd, "@PatternSizeId", project.PatternSizeId);

                    project.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Project
                            SET Name = @Name,
                                PatternSizeId = @PatternSizeId,
                                ProjectStatusId = @ProjectStatusId,
                                IsComplete = @IsComplete
                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Name", project.Name);
                    DbUtils.AddParameter(cmd, "@PatternSizeId", project.PatternSizeId);
                    DbUtils.AddParameter(cmd, "@ProjectStatusId", project.ProjectStatusId);
                    DbUtils.AddParameter(cmd, "@IsComplete", project.IsComplete);
                    DbUtils.AddParameter(cmd, "@Id", project.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Project NewProjectFromDb(SqlDataReader reader)
        {
            return new Project()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name"),
                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                UserId = DbUtils.GetInt(reader, "UserId"),
                PatternId = DbUtils.GetInt(reader, "PatternId"),
                ProjectStatusId = DbUtils.GetInt(reader, "ProjectStatusId"),
                PatternSizeId = DbUtils.GetInt(reader, "PatternSizeId"),
                IsComplete = reader.GetBoolean(reader.GetOrdinal("IsComplete")),
                Pattern = new Pattern()
                {
                    Id = DbUtils.GetInt(reader, "PatternId"),
                    Name = DbUtils.GetString(reader, "PatternName"),
                    Images = new List<PatternImage>()
                },
                ProjectStatus = new ProjectStatus()
                {
                    Id = DbUtils.GetInt(reader, "ProjectStatusId"),
                    Name = DbUtils.GetString(reader, "ProjectStatus")
                },
                PatternSize = new PatternSize()
                {
                    Id = DbUtils.GetInt(reader, "PatternSizeId"),
                    Yards = DbUtils.GetDecimal(reader, "Yards"),
                    Size = new Size()
                    {
                        Name = DbUtils.GetString(reader, "SizeName"),
                        Abbreviation = DbUtils.GetString(reader, "Abbreviation")
                    }
                }
            };
        }
    }
}
