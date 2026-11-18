using System.Text.Json.Serialization;

namespace Core.Integrations.Vpic.Models;

public class VpicModel
{
    [JsonPropertyName("Model_ID")]
    public int ModelId { get; set; }

    [JsonPropertyName("Model_Name")]
    public string? ModelName { get; set; }
}
