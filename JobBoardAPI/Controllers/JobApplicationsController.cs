using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using JobBoardAPI.Data;
using JobBoardAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace JobBoardAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class JobApplicationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public JobApplicationsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("{jobId}")]
    public async Task<IActionResult> Apply(int jobId, [FromBody] string message)
    {
        var userId = int.Parse(User.FindFirst("UserId")!.Value);

        if (await _context.JobApplications.AnyAsync(a => a.JobId == jobId && a.UserId == userId))
            return BadRequest("You already applied to this job.");

        var application = new JobApplication
        {
            JobId = jobId,
            UserId = userId,
            Message = message,
        };

        _context.JobApplications.Add(application);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Application submitted successfully" });
    }

    [HttpGet("my-applications")]
    public async Task<IActionResult> MyApplications()
    {
        var userId = int.Parse(User.FindFirst("UserId")!.Value);

        var apps = await _context.JobApplications
            .Where(a => a.UserId == userId)
            .Include(a => a.Job)
            .ToListAsync();

        return Ok(apps);
    }

    [HttpGet("job/{jobId}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> GetApplicants(int jobId)
    {
        var apps = await _context.JobApplications
            .Where(a => a.JobId == jobId)
            .Include(a => a.User)
            .ToListAsync();

        return Ok(apps);
    }
}
