using BehindTheSeams.Models;
using BehindTheSeams.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Repositories
{
    public class FabricImageRepository : BaseRepository, IFabricImageRepository
    {
        public FabricImageRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(FabricImage fabricImage)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO FabricImage (Url, FabricId)
                        OUTPUT INSERTED.ID
                        VALUES (@Url, @FabricId)";
                    DbUtils.AddParameter(cmd, "@Url", fabricImage.Url);
                    DbUtils.AddParameter(cmd, "@FabricId", fabricImage.FabricId);

                    fabricImage.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
