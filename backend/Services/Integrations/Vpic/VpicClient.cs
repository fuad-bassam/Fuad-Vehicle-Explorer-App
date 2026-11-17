using System.Net.Http.Json;
using Core.Integrations.Vpic;
using Core.Integrations.Vpic.Models;

namespace Services.Integrations.Vpic;

public class VpicClient(HttpClient httpClient) : IVpicClient
{
    public async Task<List<VpicMake>> GetAllMakesAsync(CancellationToken cancellationToken)
    {
        var response = await httpClient.GetFromJsonAsync<VpicResponse<VpicMake>>("getallmakes?format=json", cancellationToken);
        return response?.Results ?? [];
    }

    public async Task<List<VpicVehicleType>> GetVehicleTypesAsync(int makeId, CancellationToken cancellationToken)
    {
        var response = await httpClient.GetFromJsonAsync<VpicResponse<VpicVehicleType>>(
            $"GetVehicleTypesForMakeId/{makeId}?format=json", cancellationToken);
        return response?.Results ?? [];
    }

    public async Task<List<VpicModel>> GetModelsAsync(int makeId, int year, string? vehicleType, CancellationToken cancellationToken)
    {
        var url = $"GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}";

        if (!string.IsNullOrWhiteSpace(vehicleType))
        {
            url += $"/vehicletype/{Uri.EscapeDataString(vehicleType)}";
        }

        var response = await httpClient.GetFromJsonAsync<VpicResponse<VpicModel>>($"{url}?format=json", cancellationToken);
        return response?.Results ?? [];
    }
}
