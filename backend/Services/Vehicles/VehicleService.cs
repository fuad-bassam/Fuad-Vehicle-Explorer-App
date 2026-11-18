using System.Text.Json;
using Core.DTOs.Vehicles;
using Core.Enums;
using Core.Integrations.Vpic;
using Core.Services.Vehicles;
using Core.Settings;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Polly;

namespace Services.Vehicles;

public class VehicleService(
    IVpicClient vpicClient,
    IMemoryCache cache,
    IOptions<VpicOptions> options,
    ILogger<VehicleService> logger) : IVehicleService
{
    private const int FirstModelYear = 1981;
    private const int MinKeywordLength = 2;
    private const int MaxSearchResults = 50;

    public async Task<ServiceOperationResult<List<MakeForList>>> SearchMakesAsync(string? keyword, CancellationToken cancellationToken)
    {
        keyword = keyword?.Trim() ?? string.Empty;

        if (keyword.Length < MinKeywordLength)
        {
            return ServiceOperationResult<List<MakeForList>>.Failure(ErrorCode.KeywordTooShort);
        }

        var makes = await CallVpicAsync(() => GetAllMakesAsync(cancellationToken), cancellationToken);

        if (!makes.IsSuccessful)
        {
            return ServiceOperationResult<List<MakeForList>>.Failure([.. makes.ErrorCodes]);
        }

        var matches = makes.Result!
            .Where(make => make.Name.Contains(keyword, StringComparison.OrdinalIgnoreCase))
            .OrderBy(make => !make.Name.StartsWith(keyword, StringComparison.OrdinalIgnoreCase))
            .ThenBy(make => make.Name)
            .Take(MaxSearchResults)
            .ToList();

        return ServiceOperationResult<List<MakeForList>>.Success(matches);
    }

    public async Task<ServiceOperationResult<MakeForList>> GetMakeAsync(int makeId, CancellationToken cancellationToken)
    {
        if (makeId <= 0)
        {
            return ServiceOperationResult<MakeForList>.Failure(ErrorCode.InvalidMakeId);
        }

        var makes = await CallVpicAsync(() => GetAllMakesAsync(cancellationToken), cancellationToken);

        if (!makes.IsSuccessful)
        {
            return ServiceOperationResult<MakeForList>.Failure([.. makes.ErrorCodes]);
        }

        var make = makes.Result!.FirstOrDefault(item => item.Id == makeId);

        return make is null
            ? ServiceOperationResult<MakeForList>.Failure(ErrorCode.MakeNotFound)
            : ServiceOperationResult<MakeForList>.Success(make);
    }

    public async Task<ServiceOperationResult<List<VehicleTypeForList>>> GetVehicleTypesAsync(int makeId, CancellationToken cancellationToken)
    {
        if (makeId <= 0)
        {
            return ServiceOperationResult<List<VehicleTypeForList>>.Failure(ErrorCode.InvalidMakeId);
        }

        return await CallVpicAsync(() => GetCachedAsync($"types:{makeId}", async () =>
        {
            var vehicleTypes = await vpicClient.GetVehicleTypesAsync(makeId, cancellationToken);

            return vehicleTypes
                .Where(type => !string.IsNullOrWhiteSpace(type.VehicleTypeName))
                .Select(type => new VehicleTypeForList(type.VehicleTypeId, type.VehicleTypeName!.Trim()))
                .DistinctBy(type => type.Id)
                .OrderBy(type => type.Name)
                .ToList();
        }), cancellationToken);
    }

    public async Task<ServiceOperationResult<List<ModelForList>>> GetModelsAsync(int makeId, int year, string? vehicleType, CancellationToken cancellationToken)
    {
        var errors = new List<ErrorCode>();

        if (makeId <= 0)
        {
            errors.Add(ErrorCode.InvalidMakeId);
        }

        if (year < FirstModelYear || year > DateTime.UtcNow.Year + 1)
        {
            errors.Add(ErrorCode.InvalidYear);
        }

        if (errors.Count > 0)
        {
            return ServiceOperationResult<List<ModelForList>>.Failure([.. errors]);
        }

        vehicleType = string.IsNullOrWhiteSpace(vehicleType) ? null : vehicleType.Trim();

        return await CallVpicAsync(() => GetCachedAsync($"models:{makeId}:{year}:{vehicleType?.ToLowerInvariant()}", async () =>
        {
            var models = await vpicClient.GetModelsAsync(makeId, year, vehicleType, cancellationToken);

            return models
                .Where(model => !string.IsNullOrWhiteSpace(model.ModelName))
                .Select(model => new ModelForList(model.ModelId, model.ModelName!.Trim()))
                .DistinctBy(model => model.Id)
                .OrderBy(model => model.Name)
                .ToList();
        }), cancellationToken);
    }

    private Task<List<MakeForList>> GetAllMakesAsync(CancellationToken cancellationToken) =>
        GetCachedAsync("makes", async () =>
        {
            var makes = await vpicClient.GetAllMakesAsync(cancellationToken);

            return makes
                .Where(make => !string.IsNullOrWhiteSpace(make.MakeName))
                .Select(make => new MakeForList(make.MakeId, make.MakeName!.Trim()))
                .ToList();
        });

    private async Task<List<T>> GetCachedAsync<T>(string key, Func<Task<List<T>>> load)
    {
        var items = await cache.GetOrCreateAsync(key, entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(options.Value.CacheHours);
            return load();
        });

        return items ?? [];
    }

    private async Task<ServiceOperationResult<T>> CallVpicAsync<T>(Func<Task<T>> call, CancellationToken cancellationToken)
    {
        try
        {
            return ServiceOperationResult<T>.Success(await call());
        }
        catch (HttpRequestException exception)
        {
            logger.LogWarning(exception, "vPIC request failed");
        }
        catch (JsonException exception)
        {
            logger.LogWarning(exception, "vPIC returned an unreadable response");
        }
        catch (TaskCanceledException exception) when (!cancellationToken.IsCancellationRequested)
        {
            logger.LogWarning(exception, "vPIC request timed out");
        }
        catch (ExecutionRejectedException exception)
        {
            logger.LogWarning(exception, "vPIC calls are paused after too many failures or timeouts");
        }

        return ServiceOperationResult<T>.Failure(ErrorCode.UpstreamUnavailable);
    }
}
