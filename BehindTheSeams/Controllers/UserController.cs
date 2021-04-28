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
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_userRepository.GetAll());
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetUserById(int id)
        {
            return Ok(_userRepository.GetByUserId(id));
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUser(string firebaseUserId)
        {
            return Ok(_userRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction(nameof(GetUser), new { firebaseUserId = user.FirebaseUserId }, user);
        }
    }
}
