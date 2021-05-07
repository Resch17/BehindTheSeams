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
    public class ProjectNoteController : ControllerBase
    {
        private readonly IProjectNoteRepository _projectNoteRepository;

        public ProjectNoteController(IProjectNoteRepository projectNoteRepository)
        {
            _projectNoteRepository = projectNoteRepository;
        }

        [HttpPost]
        public IActionResult AddProjectNote(ProjectNotes projectNote)
        {
            _projectNoteRepository.Add(projectNote);
            return Ok(new { projectNote.Id });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProjectNote(int id)
        {
            _projectNoteRepository.Delete(id);
            return NoContent();
        }
    }
}
