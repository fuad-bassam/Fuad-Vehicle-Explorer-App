using Services.Integrations.Vpic;
using UnitTests.Fakes;

namespace UnitTests;

public class VpicClientTests
{
    private const string BaseUrl = "https://vpic.test/api/vehicles/";

    [Fact]
    public async Task GetAllMakes_ReadsTheMakesFromTheResponse()
    {
        var handler = new StubHttpMessageHandler("""{"Count":1,"Results":[{"Make_ID":474,"Make_Name":"HONDA"}]}""");
        var client = new VpicClient(new HttpClient(handler) { BaseAddress = new Uri(BaseUrl) });

        var makes = await client.GetAllMakesAsync(CancellationToken.None);

        Assert.Equal(474, makes.Single().MakeId);
        Assert.Equal("HONDA", makes.Single().MakeName);
    }

    [Fact]
    public async Task GetModels_WithVehicleType_EscapesTheTypeInTheUrl()
    {
        var handler = new StubHttpMessageHandler("""{"Count":0,"Results":[]}""");
        var client = new VpicClient(new HttpClient(handler) { BaseAddress = new Uri(BaseUrl) });

        await client.GetModelsAsync(474, 2015, "Multipurpose Passenger Vehicle (MPV)", CancellationToken.None);

        Assert.Equal(
            $"{BaseUrl}GetModelsForMakeIdYear/makeId/474/modelyear/2015/vehicletype/Multipurpose%20Passenger%20Vehicle%20%28MPV%29?format=json",
            handler.LastRequestUri!.AbsoluteUri);
    }
}
