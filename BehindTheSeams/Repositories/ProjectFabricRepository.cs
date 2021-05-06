using BehindTheSeams.Models;
using BehindTheSeams.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Repositories
{
    public class ProjectFabricRepository : BaseRepository, IProjectFabricRepository
    {
        public ProjectFabricRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(ProjectFabric projectFabric)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ProjectFabric (ProjectId, FabricId)
                        OUTPUT INSERTED.ID
                        VALUES (@ProjectId, @FabricId)";
                    DbUtils.AddParameter(cmd, "@ProjectId", projectFabric.ProjectId);
                    DbUtils.AddParameter(cmd, "@FabricId", projectFabric.FabricId);

                    projectFabric.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
