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
    public class ProjectFabricController : ControllerBase
    {
        private readonly IProjectFabricRepository _projectFabricRepository;

        public ProjectFabricController(IProjectFabricRepository projectFabricRepository)
        {
            _projectFabricRepository = projectFabricRepository;
        }

        [HttpPost]
        public IActionResult AddProjectFabric(ProjectFabric projectFabric)
        {
            _projectFabricRepository.Add(projectFabric);
            return Ok(new { projectFabric.Id });
        }
    }
}
