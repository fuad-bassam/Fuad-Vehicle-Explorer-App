using Core.DTOs;
using Core.DTOs.Vehicles;
using Core.Settings;

namespace Core.Services.Vehicles;

public interface IVehicleService
{
    Task<ServiceOperationResult<List<MakeForList>>> SearchMakesAsync(string? keyword, CancellationToken cancellationToken);

    Task<ServiceOperationResult<PagedList<MakeForList>>> GetMakesPageAsync(int page, int pageSize, CancellationToken cancellationToken);

    Task<ServiceOperationResult<MakeForList>> GetMakeAsync(int makeId, CancellationToken cancellationToken);

    Task<ServiceOperationResult<List<VehicleTypeForList>>> GetVehicleTypesAsync(int makeId, CancellationToken cancellationToken);

    Task<ServiceOperationResult<List<ModelForList>>> GetModelsAsync(int makeId, int? year, string? vehicleType, CancellationToken cancellationToken);
}
