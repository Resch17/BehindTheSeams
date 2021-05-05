using BehindTheSeams.Models;
using BehindTheSeams.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BehindTheSeams.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public FileController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var currentUser = GetCurrentUserProfile();
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("bts-client", "public", "fileuploads");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var inputFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var fileName = String.Concat(inputFileName.Where(c => !Char.IsWhiteSpace(c)));

                    var extensions = new[] { "png", "jpg", "gif", "bmp", "pdf" };
                    var fileParts = fileName.Split('.').ToList();
                    fileParts.Reverse();
                    if (!extensions.Contains(fileParts[0].ToLower()))
                    {
                        return BadRequest();
                    }

                    Guid random = Guid.NewGuid();

                    string randomFileName = currentUser.Id + "-" + random.ToString() + "." + fileParts[0].ToLower();

                    var fullPath = Path.Combine(pathToSave, randomFileName);

                    if (System.IO.File.Exists(fullPath))
                    {
                        throw new Exception("File already exists");
                    }

                    var outputPath = Path.Combine(folderName, randomFileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);

                        return Ok(new { outputPath });
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }


}
