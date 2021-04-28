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
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Username, FirebaseUserId, Email, RegisterDateTime, IsAdministrator FROM [User]";
                    var reader = cmd.ExecuteReader();
                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(NewUserFromDb(reader));
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        public User GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Username, FirebaseUserId, Email, RegisterDateTime, IsAdministrator FROM [User]
                        WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);

                    User user = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = NewUserFromDb(reader);
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, Username, FirebaseUserId, Email, RegisterDateTime, IsAdministrator FROM [User]
                        WHERE FirebaseUserId = @FirebaseUserId";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    User user = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = NewUserFromDb(reader);
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [User] (Username, FirebaseUserId, Email, RegisterDateTime, IsAdministrator)
                        OUTPUT INSERTED.ID
                        VALUES (@Username, @FirebaseUserId, @Email, SYSDATETIME(), @IsAdministrator";
                    DbUtils.AddParameter(cmd, "@Username", user.Username);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", user.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@IsAdministrator", user.IsAdministrator);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        private User NewUserFromDb(SqlDataReader reader)
        {
            return new User()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Username = DbUtils.GetString(reader, "Username"),
                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                Email = DbUtils.GetString(reader, "Email"),
                RegisterDateTime = DbUtils.GetDateTime(reader, "RegisterDateTime"),
                IsAdministrator = reader.GetBoolean(reader.GetOrdinal("IsAdministrator"))
            };
        }
    }
}
