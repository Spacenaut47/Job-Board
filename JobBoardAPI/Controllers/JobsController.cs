using Microsoft.AspNetCore.Mvc;
using JobBoardAPI.Data;
using JobBoardAPI.Models;

namespace JobBoardAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly AppDbContext _context;

    public JobsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAllJobs()
    {
        var jobs = _context.Jobs.ToList();
        return Ok(jobs);
    }

    [HttpPost]
    public IActionResult AddJob(Job job)
    {
        _context.Jobs.Add(job);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAllJobs), new { id = job.Id }, job);
    }
}
