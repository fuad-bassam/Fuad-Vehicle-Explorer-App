namespace Core.Settings;

public class RateLimitOptions
{
    public const string SectionName = "RateLimiting";

    public const string PolicyName = "per-client";

    public int PermitLimit { get; set; } = 100;

    public int WindowSeconds { get; set; } = 60;
}
