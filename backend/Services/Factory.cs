using Core.Integrations.Vpic;
using Core.Services.Vehicles;
using Core.Settings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Integrations.Vpic;
using Services.Vehicles;

namespace Services;

public static class Factory
{
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
        var vpicSection = configuration.GetSection(VpicOptions.SectionName);
        var vpicOptions = vpicSection.Get<VpicOptions>() ?? new VpicOptions();

        services.Configure<VpicOptions>(vpicSection);
        services.AddMemoryCache();
        services.AddHttpClient<IVpicClient, VpicClient>(client => client.BaseAddress = new Uri(vpicOptions.BaseUrl));
        services.AddScoped<IVehicleService, VehicleService>();

        return services;
    }
}
