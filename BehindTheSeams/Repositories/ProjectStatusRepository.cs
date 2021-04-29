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
    public class ProjectStatusRepository : BaseRepository, IProjectStatusRepository
    {
        public ProjectStatusRepository(IConfiguration configuration) : base(configuration) { }

        public List<ProjectStatus> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name]
                        FROM ProjectStatus";
                    var reader = cmd.ExecuteReader();
                    var projectStatuses = new List<ProjectStatus>();
                    while (reader.Read())
                    {
                        projectStatuses.Add(NewProjectStatusFromDb(reader));
                    }
                    reader.Close();
                    return projectStatuses;
                }
            }
        }

        public ProjectStatus GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT [Id], [Name]
                            FROM ProjectStatus
                        WHERE [Id] = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();
                    ProjectStatus projectStatus = null;
                    while (reader.Read())
                    {
                        if (projectStatus == null)
                        {
                            projectStatus = NewProjectStatusFromDb(reader);
                        }
                    }
                    reader.Close();
                    return projectStatus;
                }
            }

        }

        private ProjectStatus NewProjectStatusFromDb(SqlDataReader reader)
        {
            return new ProjectStatus()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
        }
    }
}
