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
    public class PublisherController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IPublisherRepository _publisherRepository;
        public PublisherController(IUserRepository userRepository, IPublisherRepository publisherRepository)
        {
            _userRepository = userRepository;
            _publisherRepository = publisherRepository;
        }

        [HttpGet]
        public IActionResult GetAllPublishers()
        {
            return Ok(_publisherRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_publisherRepository.GetById(id));
        }
    }
}
