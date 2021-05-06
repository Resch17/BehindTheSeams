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
    public class PatternSizeController : ControllerBase
    {
        private readonly IPatternSizeRepository _patternSizeRepository;

        public PatternSizeController(IPatternSizeRepository patternSizeRepository)
        {
            _patternSizeRepository = patternSizeRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetByPatternId(int id)
        {
            return Ok(_patternSizeRepository.GetByPatternId(id));
        }

        [HttpPost]
        public IActionResult AddPatternSize(PatternSize patternSize)
        {
            _patternSizeRepository.Add(patternSize);
            return NoContent();
        }
    }
}
