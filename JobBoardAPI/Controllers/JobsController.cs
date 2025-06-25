using Microsoft.AspNetCore.Mvc;
using JobBoardAPI.Data;
using JobBoardAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace JobBoardAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobsController : ControllerBase
{
    private readonly AppDbContext _context;

    public JobsController(AppDbContext context)
    {
        _context = context;
    }

    [AllowAnonymous]
    [HttpGet]
    public IActionResult GetAllJobs()
    {
        var jobs = _context.Jobs.ToList();
        return Ok(jobs);
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public IActionResult AddJob(Job job)
    {
        _context.Jobs.Add(job);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAllJobs), new { id = job.Id }, job);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "AdminOnly")]
    public IActionResult DeleteJob(int id)
    {
        var job = _context.Jobs.Find(id);
        if (job == null) return NotFound();

        _context.Jobs.Remove(job);
        _context.SaveChanges();
        return NoContent();
    }
}
