using System.Text.Json.Serialization;

namespace Core.Enums;

[JsonConverter(typeof(JsonStringEnumConverter<ErrorCode>))]
public enum ErrorCode
{
    InvalidRequest,
    InvalidMakeId,
    InvalidYear,
    KeywordTooShort,
    MakeNotFound,
    UpstreamUnavailable,
    RateLimited,
    Unexpected
}
