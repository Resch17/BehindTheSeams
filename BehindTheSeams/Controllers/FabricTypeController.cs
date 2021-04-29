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
    public class FabricTypeController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IFabricTypeRepository _fabricTypeRepository;
        public FabricTypeController(IUserRepository userRepository, IFabricTypeRepository fabricTypeRepository)
        {
            _userRepository = userRepository;
            _fabricTypeRepository = fabricTypeRepository;
        }

        [HttpGet]
        public IActionResult GetAllFabricTypes()
        {
            return Ok(_fabricTypeRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_fabricTypeRepository.GetById(id));
        }
    }
}
