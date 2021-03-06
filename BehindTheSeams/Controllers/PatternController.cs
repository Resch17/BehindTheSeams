using BehindTheSeams.Models;
using BehindTheSeams.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BehindTheSeams.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PatternController : ControllerBase
    {
        private readonly IPatternRepository _patternRepository;
        private readonly IUserRepository _userRepository;
        private readonly IProjectRepository _projectRepository;

        public PatternController(IUserRepository userRepository, IPatternRepository patternRepository, IProjectRepository projectRepository)
        {
            _userRepository = userRepository;
            _patternRepository = patternRepository;
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public IActionResult GetAllPatterns()
        {
            var user = GetCurrentUser();
            return Ok(_patternRepository.GetAll(user.Id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = GetCurrentUser();
            var pattern = _patternRepository.GetById(id);
            if (pattern == null)
            {
                return BadRequest();
            }
            if (user.Id != pattern.UserId)
            {
                return Unauthorized();
            }
            return Ok(pattern);
        }

        [HttpPost]
        public IActionResult AddPattern(Pattern pattern)
        {
            var currentUser = GetCurrentUser();
            pattern.UserId = currentUser.Id;
            _patternRepository.Add(pattern);
            return Ok(new { pattern.Id });
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePattern(int id)
        {
            var user = GetCurrentUser();
            List<Project> projects = _projectRepository.GetAll(user.Id).Where(p => p.PatternId == id).ToList();
            List<Project> completedProjects = _projectRepository.GetAllComplete(user.Id).Where(p => p.PatternId == id).ToList();
            List<Project> allUserProjects = projects.Concat(completedProjects).ToList();
            _patternRepository.Delete(id, allUserProjects);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Pattern pattern)
        {
            var currentUser = GetCurrentUser();
            if (pattern.UserId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != pattern.Id)
            {
                return BadRequest();
            }
            _patternRepository.Update(pattern);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
