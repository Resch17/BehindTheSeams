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
            return Ok(_projectRepository.GetById(id));
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
