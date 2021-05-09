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
    public class PatternFileController : ControllerBase
    {
        private readonly IPatternFileRepository _patternFileRepository;

        public PatternFileController(IPatternFileRepository patternFileRepository)
        {
            _patternFileRepository = patternFileRepository;
        }

        [HttpPost]
        public IActionResult AddPatternFile(File patternFile)
        {
            _patternFileRepository.Add(patternFile);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePatternFile(int id)
        {
            _patternFileRepository.Delete(id);
            return NoContent();
        }
    }
}
