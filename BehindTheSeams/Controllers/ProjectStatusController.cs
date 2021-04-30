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
    public class ProjectStatusController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IProjectStatusRepository _projectStatusRepository;
        public ProjectStatusController(IUserRepository userRepository, IProjectStatusRepository projectStatusRepository)
        {
            _userRepository = userRepository;
            _projectStatusRepository = projectStatusRepository;
        }

        [HttpGet]
        public IActionResult GetAllProjectStatuses()
        {
            return Ok(_projectStatusRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_projectStatusRepository.GetById(id));
        }
        
    }
}
