using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class ProjectImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int ProjectId { get; set; }
        public string Caption { get; set; }
    } 
}
