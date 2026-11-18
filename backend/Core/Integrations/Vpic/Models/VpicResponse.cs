namespace Core.Integrations.Vpic.Models;

public class VpicResponse<T>
{
    public int Count { get; set; }

    public string? Message { get; set; }

    public List<T>? Results { get; set; }
}
