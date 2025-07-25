using JobExplorer.Domain.Models;

namespace JobExplorer.Application.Interfaces;

public interface IJobService
{
    Task<List<Job>> GetJobsAsync(string? keyword = null, string? location = null);
}
