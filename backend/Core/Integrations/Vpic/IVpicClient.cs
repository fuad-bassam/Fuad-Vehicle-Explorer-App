using Core.Integrations.Vpic.Models;

namespace Core.Integrations.Vpic;

public interface IVpicClient
{
    Task<List<VpicMake>> GetAllMakesAsync(CancellationToken cancellationToken);

    Task<List<VpicVehicleType>> GetVehicleTypesAsync(int makeId, CancellationToken cancellationToken);

    Task<List<VpicModel>> GetModelsAsync(int makeId, int? year, string? vehicleType, CancellationToken cancellationToken);
}
