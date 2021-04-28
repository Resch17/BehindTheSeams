using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }
        public int PatternId { get; set; }
        public Pattern Pattern { get; set; }
        public int ProjectStatusId { get; set; }
        public ProjectStatus ProjectStatus {get;set;}
        public int PatternSizeId { get; set; }
        public PatternSize PatternSize { get; set; }
        public bool IsComplete { get; set; }
    }
}
