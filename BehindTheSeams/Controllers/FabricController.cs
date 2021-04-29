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
    public class FabricController : ControllerBase
    {
        private readonly IFabricRepository _fabricRepository;
        private readonly IUserRepository _userRepository;

        public FabricController(IUserRepository userRepository, IFabricRepository fabricRepository)
        {
            _fabricRepository = fabricRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult GetAllFabric()
        {
            var user = GetCurrentUser();
            return Ok(_fabricRepository.GetAll(user.Id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_fabricRepository.GetById(id));
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
