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
            var user = GetCurrentUser();
            var fabric = _fabricRepository.GetById(id);
            if (fabric == null)
            {
                return BadRequest();
            }
            if (user.Id != fabric.UserId)
            {
                return Unauthorized();
            }
            return Ok(fabric);
        }

        [HttpPost]
        public IActionResult AddFabric(Fabric fabric)
        {
            var currentUser = GetCurrentUser();
            fabric.UserId = currentUser.Id;
            _fabricRepository.Add(fabric);
            return Ok(new { fabric.Id });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _fabricRepository.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Fabric fabric)
        {
            var currentUser = GetCurrentUser();
            if (fabric.UserId != currentUser.Id)
            {
                return Unauthorized();
            }
            if (id != fabric.Id)
            {
                return BadRequest();
            }
            _fabricRepository.Update(fabric);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
