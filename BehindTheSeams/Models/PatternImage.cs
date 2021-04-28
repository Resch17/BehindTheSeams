using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class PatternImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int PatternId { get; set; }
        public bool IsCover { get; set; }
    }
}
