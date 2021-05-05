using BehindTheSeams.Models;
using BehindTheSeams.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BehindTheSeams.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PatternImageController : ControllerBase
    {
        private readonly IPatternImageRepository _patternImageRepository;

        public PatternImageController(IPatternImageRepository patternImageRepository)
        {
            _patternImageRepository = patternImageRepository;
        }

        [HttpPost]
        public IActionResult AddPatternImage(PatternImage patternImage)
        {
            _patternImageRepository.Add(patternImage);
            return NoContent();
        }
    }
}
