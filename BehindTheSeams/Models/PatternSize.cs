using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class PatternSize
    {
        public int Id { get; set; }
        public int PatternId { get; set; }
        public int SizeId { get; set; }
        public Size Size { get; set; }
        public decimal Yards { get; set; }
    }
}
