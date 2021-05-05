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
    public class FabricImageController : ControllerBase
    {
        private readonly IFabricImageRepository _fabricImageRespository;

        public FabricImageController(IFabricImageRepository fabricImageRepository)
        {
            _fabricImageRespository = fabricImageRepository;
        }

        [HttpPost]
        public IActionResult AddFabricImage(FabricImage fabricImage)
        {
            _fabricImageRespository.Add(fabricImage);
            return NoContent();
        }
    }
}
