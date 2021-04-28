using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class Fabric
    {
        public int Id { get; set; }
        public int Retailerid { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public decimal PricePerYard { get; set; }
        public decimal YardsInStock { get; set; }
        public int FabricTypeId { get; set; }
        public string Notes { get; set; }
    }
}
