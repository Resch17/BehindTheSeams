using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Username { get; set; }
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }
        [Required]
        [DataType(DataType.EmailAddress)]
        [MaxLength(255)]
        public string Email { get; set; }
        public DateTime RegisterDateTime { get; set; }
        public bool IsAdministrator { get; set; }
    }
}
