namespace JobExplorer.Domain.Models;

public class Job
{
    public string Id { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new();
    public string Url { get; set; } = string.Empty;
}
