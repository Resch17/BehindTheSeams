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
    public class SizeController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ISizeRepository _sizeRepository;
        public SizeController(IUserRepository userRepository, ISizeRepository sizeRepository)
        {
            _userRepository = userRepository;
            _sizeRepository = sizeRepository;
        }

        [HttpGet]
        public IActionResult GetAllSizes()
        {
            return Ok(_sizeRepository.GetAllSizes());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_sizeRepository.GetById(id));
        }
    }
}
