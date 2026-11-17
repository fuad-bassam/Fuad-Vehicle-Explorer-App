using Core.Integrations.Vpic;
using Core.Integrations.Vpic.Models;

namespace UnitTests.Fakes;

public class FakeVpicClient : IVpicClient
{
    public List<VpicMake> Makes { get; set; } = [];

    public List<VpicVehicleType> VehicleTypes { get; set; } = [];

    public List<VpicModel> Models { get; set; } = [];

    public Exception? ExceptionToThrow { get; set; }

    public int GetAllMakesCalls { get; private set; }

    public Task<List<VpicMake>> GetAllMakesAsync(CancellationToken cancellationToken)
    {
        GetAllMakesCalls++;
        ThrowIfNeeded();
        return Task.FromResult(Makes);
    }

    public Task<List<VpicVehicleType>> GetVehicleTypesAsync(int makeId, CancellationToken cancellationToken)
    {
        ThrowIfNeeded();
        return Task.FromResult(VehicleTypes);
    }

    public Task<List<VpicModel>> GetModelsAsync(int makeId, int year, string? vehicleType, CancellationToken cancellationToken)
    {
        ThrowIfNeeded();
        return Task.FromResult(Models);
    }

    private void ThrowIfNeeded()
    {
        if (ExceptionToThrow is not null)
        {
            throw ExceptionToThrow;
        }
    }
}
