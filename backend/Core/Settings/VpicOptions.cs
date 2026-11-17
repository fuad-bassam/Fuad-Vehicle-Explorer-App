namespace Core.Settings;

public class VpicOptions
{
    public const string SectionName = "Vpic";

    public string BaseUrl { get; set; } = string.Empty;

    public int CacheHours { get; set; } = 24;
}
