using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class ProjectFabric
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public int FabricId { get; set; }
        public decimal Yards { get; set; }
    }
}
