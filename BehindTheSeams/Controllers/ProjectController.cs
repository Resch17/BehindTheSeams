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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUserRepository _userRepository;

        public ProjectController(IUserRepository userRepository, IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllProjects()
        {
            var user = GetCurrentUser();
            return Ok(_projectRepository.GetAll(user.Id));
        }

        [HttpGet("complete")]
        public IActionResult GetCompleteProjects()
        {
            var user = GetCurrentUser();
            return Ok(_projectRepository.GetAllComplete(user.Id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = GetCurrentUser();
            var project = _projectRepository.GetById(id);
            if (project == null)
            {
                return BadRequest();
            }
            if (user.Id != project.UserId)
            {
                return Unauthorized();
            }
            return Ok(project);
        }

        [HttpPost]
        public IActionResult AddProject(Project project)
        {
            var currentUser = GetCurrentUser();
            project.UserId = currentUser.Id;
            _projectRepository.Add(project);
            return Ok(new { project.Id });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Project project)
        {
            var currentUser = GetCurrentUser();
            if (project.UserId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != project.Id)
            {
                return BadRequest();
            }

            _projectRepository.Update(project);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
