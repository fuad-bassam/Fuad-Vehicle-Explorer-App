using System.Text.Json.Serialization;

namespace Core.Integrations.Vpic.Models;

public class VpicMake
{
    [JsonPropertyName("Make_ID")]
    public int MakeId { get; set; }

    [JsonPropertyName("Make_Name")]
    public string? MakeName { get; set; }
}
