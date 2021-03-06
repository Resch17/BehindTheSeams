using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class Pattern
    {
        public int Id { get; set; }
        public string Url { get; set; } 
        public int UserId { get; set; }
        public string Name { get; set; }
        public int PublisherId { get; set; }
        public Publisher Publisher { get; set; }
        public DateTime PurchaseDate { get; set; }
        public int FabricTypeId { get; set; }
        public FabricType FabricType { get; set; }
        public string Notes { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public List<PatternSize> PatternSizes { get; set; }
        public List<PatternImage> Images { get; set; }
        public List<File> Files { get; set; }
    }
}
