﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Models
{
    public class FabricImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int FabricId { get; set; }
    }
}
