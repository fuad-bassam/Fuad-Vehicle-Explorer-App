using System.Net;
using System.Net.Http.Json;
using Core.DTOs.Vehicles;
using Core.Enums;
using Core.Integrations.Vpic;
using Core.Integrations.Vpic.Models;
using Core.Settings;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using UnitTests.Fakes;

namespace UnitTests;

public class MakesApiTests : IDisposable
{
    private readonly FakeVpicClient _vpicClient = new();
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public MakesApiTests()
    {
        _vpicClient.Makes = [new VpicMake { MakeId = 474, MakeName = "HONDA" }];

        _factory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
            builder.ConfigureTestServices(services => services.AddSingleton<IVpicClient>(_vpicClient)));

        _client = _factory.CreateClient();
    }

    public void Dispose()
    {
        _client.Dispose();
        _factory.Dispose();
    }

    [Fact]
    public async Task GetMake_ReturnsTheMake()
    {
        var response = await _client.GetAsync("/api/makes/474");
        var body = await response.Content.ReadFromJsonAsync<ServiceOperationResult<MakeForList>>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal(new MakeForList(474, "HONDA"), body!.Result);
    }

    [Fact]
    public async Task GetMake_WithUnknownId_ReturnsNotFound()
    {
        var response = await _client.GetAsync("/api/makes/999");
        var body = await response.Content.ReadFromJsonAsync<ServiceOperationResult<MakeForList>>();

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal([ErrorCode.MakeNotFound], body!.ErrorCodes);
    }

    [Fact]
    public async Task GetModels_WithTextYear_ReturnsBadRequest()
    {
        var response = await _client.GetAsync("/api/makes/474/models?year=abc");
        var body = await response.Content.ReadFromJsonAsync<ServiceOperationResult<object>>();

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal([ErrorCode.InvalidRequest], body!.ErrorCodes);
    }

    [Fact]
    public async Task GetVehicleTypes_WhenVpicIsDown_ReturnsBadGateway()
    {
        _vpicClient.ExceptionToThrow = new HttpRequestException("vPIC is down");

        var response = await _client.GetAsync("/api/makes/474/vehicle-types");
        var body = await response.Content.ReadFromJsonAsync<ServiceOperationResult<object>>();

        Assert.Equal(HttpStatusCode.BadGateway, response.StatusCode);
        Assert.Equal([ErrorCode.UpstreamUnavailable], body!.ErrorCodes);
    }

    [Fact]
    public async Task GetVehicleTypes_WhenSomethingUnexpectedFails_ReturnsServerError()
    {
        _vpicClient.ExceptionToThrow = new InvalidOperationException("bug");

        var response = await _client.GetAsync("/api/makes/474/vehicle-types");
        var body = await response.Content.ReadFromJsonAsync<ServiceOperationResult<object>>();

        Assert.Equal(HttpStatusCode.InternalServerError, response.StatusCode);
        Assert.Equal([ErrorCode.Unexpected], body!.ErrorCodes);
    }

    [Fact]
    public async Task GetMake_OverTheLimit_ReturnsTooManyRequests()
    {
        using var factory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.UseSetting("RateLimiting:PermitLimit", "2");
            builder.ConfigureTestServices(services => services.AddSingleton<IVpicClient>(_vpicClient));
        });
        using var client = factory.CreateClient();

        await client.GetAsync("/api/makes/474");
        await client.GetAsync("/api/makes/474");
        var response = await client.GetAsync("/api/makes/474");
        var body = await response.Content.ReadFromJsonAsync<ServiceOperationResult<object>>();

        Assert.Equal(HttpStatusCode.TooManyRequests, response.StatusCode);
        Assert.Equal([ErrorCode.RateLimited], body!.ErrorCodes);
        Assert.NotNull(response.Headers.RetryAfter);
    }
}
