using JobExplorer.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace JobExplorer.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class JobsController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobsController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    public async Task<IActionResult> GetJobs([FromQuery] string? keyword, [FromQuery] string? location)
    {
        var jobs = await _jobService.GetJobsAsync(keyword, location);
        return Ok(jobs);
    }
}
