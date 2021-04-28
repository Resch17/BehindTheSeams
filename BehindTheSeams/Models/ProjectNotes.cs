using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class ProjectNotes
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Text { get; set; }
    }
}
