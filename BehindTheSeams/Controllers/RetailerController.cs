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
    public class RetailerController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IRetailerRepository _retailerRepository;
        public RetailerController(IUserRepository userRepository, IRetailerRepository retailerRepository)
        {
            _userRepository = userRepository;
            _retailerRepository = retailerRepository;
        }

        [HttpGet]
        public IActionResult GetAllRetailers()
        {
            return Ok(_retailerRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_retailerRepository.GetById(id));
        }
    }
}
