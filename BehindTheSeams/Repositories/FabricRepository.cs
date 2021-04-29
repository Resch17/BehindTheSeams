﻿using BehindTheSeams.Models;
using BehindTheSeams.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Repositories
{
    public class FabricRepository : BaseRepository, IFabricRepository
    {
        public FabricRepository(IConfiguration configuration) : base(configuration) { }

        public List<Fabric> GetAll(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT f.Id, f.RetailerId, f.UserId, f.[Name], f.[Url], f.PricePerYard, f.YardsInStock,
                    	f.FabricTypeId, ft.[Name] AS FabricTypeName, f.Notes,
	                    r.[Name] AS RetailerName, r.[Url] AS RetailerUrl,
                        fi.Id AS FabricImageId, fi.[Url] AS FabricImageUrl
                    FROM Fabric f
	                    LEFT JOIN FabricType ft ON ft.Id = f.FabricTypeId
	                    LEFT JOIN Retailer r ON r.Id = f.RetailerId
                        LEFT JOIN FabricImage fi ON fi.FabricId = f.Id
                    WHERE f.UserId = @UserId";
                    DbUtils.AddParameter(cmd, "@UserId", userId);

                    var reader = cmd.ExecuteReader();
                    var fabrics = new List<Fabric>();
                    while (reader.Read())
                    {
                        var fabricId = DbUtils.GetInt(reader, "Id");
                        var existingFabric = fabrics.FirstOrDefault(f => f.Id == fabricId);
                        if (existingFabric == null)
                        {
                            existingFabric = NewFabricFromDb(reader);
                            existingFabric.Images = new List<FabricImage>();
                            fabrics.Add(existingFabric);
                        }

                        if (DbUtils.IsNotDbNull(reader, "FabricImageId"))
                        {
                            var fabricImageId = DbUtils.GetInt(reader, "FabricImageId");
                            var existingFabricImage = existingFabric.Images.FirstOrDefault(fi => fi.Id == fabricImageId);
                            if (existingFabricImage == null)
                            {
                                existingFabric.Images.Add(new FabricImage()
                                {
                                    Id = fabricImageId,
                                    Url = DbUtils.GetString(reader, "FabricImageUrl")
                                });
                            }
                        }
                    }
                    reader.Close();
                    return fabrics;
                }
            }
        }

        public Fabric GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT f.Id, f.RetailerId, f.UserId, f.[Name], f.[Url], f.PricePerYard, f.YardsInStock,
                    	    f.FabricTypeId, ft.[Name] AS FabricTypeName, f.Notes,
	                        r.[Name] AS RetailerName, r.[Url] AS RetailerUrl,
                            fi.Id AS FabricImageId, fi.[Url] AS FabricImageUrl
                        FROM Fabric f
	                        LEFT JOIN FabricType ft ON ft.Id = f.FabricTypeId
	                        LEFT JOIN Retailer r ON r.Id = f.RetailerId
                            LEFT JOIN FabricImage fi ON fi.FabricId = f.Id
                        WHERE f.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    Fabric fabric = null;
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        if (fabric == null)
                        {
                            fabric = NewFabricFromDb(reader);
                            fabric.Images = new List<FabricImage>();
                        }

                        if (DbUtils.IsNotDbNull(reader, "FabricImageId"))
                        {
                            var fabricImageId = DbUtils.GetInt(reader, "FabricImageId");
                            var existingFabricImage = fabric.Images.FirstOrDefault(fi => fi.Id == fabricImageId);
                            if (existingFabricImage == null)
                            {
                                fabric.Images.Add(new FabricImage()
                                {
                                    Id = fabricImageId,
                                    Url = DbUtils.GetString(reader, "FabricImageUrl")
                                });
                            }
                        }
                    }
                    reader.Close();
                    return fabric;
                }
            }
        }

        private Fabric NewFabricFromDb(SqlDataReader reader)
        {
            return new Fabric()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Retailerid = DbUtils.GetInt(reader, "RetailerId"),
                Retailer = new Retailer()
                {
                    Id = DbUtils.GetInt(reader, "RetailerId"),
                    Name = DbUtils.GetString(reader, "RetailerName"),
                    Url = DbUtils.GetString(reader, "RetailerUrl")
                },
                UserId = DbUtils.GetInt(reader, "UserId"),
                Name = DbUtils.GetString(reader, "Name"),
                Url = DbUtils.GetString(reader, "Url"),
                PricePerYard = DbUtils.GetDecimal(reader, "PricePerYard"),
                YardsInStock = DbUtils.GetDecimal(reader, "YardsInStock"),
                FabricTypeId = DbUtils.GetInt(reader, "FabricTypeId"),
                FabricType = new FabricType()
                {
                    Id = DbUtils.GetInt(reader, "FabricTypeId"),
                    Name = DbUtils.GetString(reader, "FabricTypeName")
                },
                Notes = DbUtils.GetString(reader, "Notes")
            };
        }
    }
}
