using Microsoft.AspNetCore.Mvc;

namespace JobBoardAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HelloController : ControllerBase
{
    [HttpGet]
    public IActionResult SayHi()
    {
        return Ok("Hello from .NET API!");
    }
}
