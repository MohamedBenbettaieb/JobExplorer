using JobExplorer.Application.Interfaces;
using JobExplorer.Domain.Models;
using System.Net.Http.Json;

namespace JobExplorer.Infrastructure.Services;

public class RemoteOkJobService : IJobService
{
    private readonly HttpClient _httpClient;

    public RemoteOkJobService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://remoteok.com/");
    }

    public async Task<List<Job>> GetJobsAsync(string? keyword = null, string? location = null)
    {
        var jobs = await _httpClient.GetFromJsonAsync<List<RemoteOkJob>>("api") ?? new();

        var mapped = jobs
            .Where(j => !string.IsNullOrWhiteSpace(j.Position))
            .Select(j => new Job
            {
                Id = j.Id.ToString(),
                Company = j.Company ?? "",
                Position = j.Position ?? "",
                Location = j.Location ?? "",
                Tags = j.Tags ?? new List<string>(),
                Url = j.Url ?? ""
            })
            .ToList();

        if (!string.IsNullOrWhiteSpace(keyword))
            mapped = mapped.Where(j => j.Position.Contains(keyword, StringComparison.OrdinalIgnoreCase)).ToList();

        if (!string.IsNullOrWhiteSpace(location))
            mapped = mapped.Where(j => j.Location.Contains(location, StringComparison.OrdinalIgnoreCase)).ToList();

        return mapped;
    }

    private class RemoteOkJob
    {
        public int Id { get; set; }
        public string? Company { get; set; }
        public string? Position { get; set; }
        public string? Location { get; set; }
        public List<string>? Tags { get; set; }
        public string? Url { get; set; }
    }
}
