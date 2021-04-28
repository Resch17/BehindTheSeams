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

        public PatternController(IUserRepository userRepository, IPatternRepository patternRepository)
        {
            _userRepository = userRepository;
            _patternRepository = patternRepository;
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
            return Ok(_patternRepository.GetById(id));
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
