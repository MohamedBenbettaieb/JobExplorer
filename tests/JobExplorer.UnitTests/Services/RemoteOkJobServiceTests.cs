using FluentAssertions;
using JobExplorer.Infrastructure.Services;
using System.Net;

namespace JobExplorer.UnitTests.Services;

public class RemoteOkJobServiceTests
{
    [Fact]
    public async Task GetJobsAsync_ReturnsMappedJobs()
    {
        // Arrange
        var mockJson = """
        [
          {
            "id": 123,
            "company": "TestCorp",
            "position": "React Developer",
            "location": "Remote",
            "tags": ["react", "frontend"],
            "url": "https://remoteok.com/job/123"
          }
        ]
        """;

        var handler = new MockHttpMessageHandler(mockJson, HttpStatusCode.OK);
        var httpClient = new HttpClient(handler) { BaseAddress = new Uri("https://fake.com/") };

        var service = new RemoteOkJobService(httpClient);

        // Act
        var jobs = await service.GetJobsAsync();

        // Assert
        jobs.Should().HaveCount(1);
        jobs[0].Company.Should().Be("TestCorp");
        jobs[0].Position.Should().Be("React Developer");
        jobs[0].Tags.Should().Contain("frontend");
    }

    private class MockHttpMessageHandler : HttpMessageHandler
    {
        private readonly string _response;
        private readonly HttpStatusCode _statusCode;

        public MockHttpMessageHandler(string response, HttpStatusCode statusCode)
        {
            _response = response;
            _statusCode = statusCode;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new HttpResponseMessage
            {
                StatusCode = _statusCode,
                Content = new StringContent(_response, System.Text.Encoding.UTF8, "application/json")
            });
        }
    }
}
