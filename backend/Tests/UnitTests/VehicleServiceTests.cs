using Core.Enums;
using Core.Integrations.Vpic.Models;
using Core.Settings;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Polly.CircuitBreaker;
using Polly.Timeout;
using Services.Vehicles;
using UnitTests.Fakes;

namespace UnitTests;

public class VehicleServiceTests
{
    private readonly FakeVpicClient _vpicClient = new();
    private readonly VehicleService _service;

    public VehicleServiceTests()
    {
        _service = new VehicleService(
            _vpicClient,
            new MemoryCache(new MemoryCacheOptions()),
            Options.Create(new VpicOptions { CacheHours = 24 }),
            NullLogger<VehicleService>.Instance);
    }

    [Fact]
    public async Task SearchMakes_WithOneLetter_ReturnsKeywordTooShort()
    {
        var result = await _service.SearchMakesAsync("h", CancellationToken.None);

        Assert.Equal([ErrorCode.KeywordTooShort], result.ErrorCodes);
    }

    [Fact]
    public async Task SearchMakes_PutsMakesStartingWithTheKeywordFirst()
    {
        _vpicClient.Makes =
        [
            new VpicMake { MakeId = 1, MakeName = "CHONGQING" },
            new VpicMake { MakeId = 474, MakeName = "HONDA" },
            new VpicMake { MakeId = 448, MakeName = "TOYOTA" }
        ];

        var result = await _service.SearchMakesAsync("hon", CancellationToken.None);

        Assert.Equal(["HONDA", "CHONGQING"], result.Result!.Select(make => make.Name));
    }

    [Fact]
    public async Task SearchMakes_SecondSearch_UsesTheCachedMakes()
    {
        _vpicClient.Makes = [new VpicMake { MakeId = 474, MakeName = "HONDA" }];

        await _service.SearchMakesAsync("hon", CancellationToken.None);
        await _service.SearchMakesAsync("hond", CancellationToken.None);

        Assert.Equal(1, _vpicClient.GetAllMakesCalls);
    }

    [Fact]
    public async Task GetMake_WithUnknownId_ReturnsMakeNotFound()
    {
        _vpicClient.Makes = [new VpicMake { MakeId = 474, MakeName = "HONDA" }];

        var result = await _service.GetMakeAsync(999, CancellationToken.None);

        Assert.Equal([ErrorCode.MakeNotFound], result.ErrorCodes);
    }

    [Fact]
    public async Task GetModels_WithYearBefore1981_ReturnsInvalidYear()
    {
        var result = await _service.GetModelsAsync(474, 1980, null, CancellationToken.None);

        Assert.Equal([ErrorCode.InvalidYear], result.ErrorCodes);
    }

    [Fact]
    public async Task GetModels_WithYearAfterNextYear_ReturnsInvalidYear()
    {
        var result = await _service.GetModelsAsync(474, DateTime.UtcNow.Year + 2, null, CancellationToken.None);

        Assert.Equal([ErrorCode.InvalidYear], result.ErrorCodes);
    }

    [Fact]
    public async Task GetVehicleTypes_WhenVpicIsDown_ReturnsUpstreamUnavailable()
    {
        _vpicClient.ExceptionToThrow = new HttpRequestException("vPIC is down");

        var result = await _service.GetVehicleTypesAsync(474, CancellationToken.None);

        Assert.Equal([ErrorCode.UpstreamUnavailable], result.ErrorCodes);
    }

    [Fact]
    public async Task GetVehicleTypes_WhenVpicTimesOut_ReturnsUpstreamUnavailable()
    {
        _vpicClient.ExceptionToThrow = new TimeoutRejectedException("vPIC timed out");

        var result = await _service.GetVehicleTypesAsync(474, CancellationToken.None);

        Assert.Equal([ErrorCode.UpstreamUnavailable], result.ErrorCodes);
    }

    [Fact]
    public async Task GetVehicleTypes_WhenVpicCallsArePaused_ReturnsUpstreamUnavailable()
    {
        _vpicClient.ExceptionToThrow = new BrokenCircuitException("vPIC calls are paused");

        var result = await _service.GetVehicleTypesAsync(474, CancellationToken.None);

        Assert.Equal([ErrorCode.UpstreamUnavailable], result.ErrorCodes);
    }
}
