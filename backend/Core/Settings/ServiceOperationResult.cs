using Core.Enums;

namespace Core.Settings;

public class ServiceOperationResult<T>
{
    public T? Result { get; set; }

    public List<ErrorCode> ErrorCodes { get; set; } = [];

    public bool IsSuccessful => ErrorCodes.Count == 0;

    public List<string> Errors => ErrorCodes.Select(GetMessage).ToList();

    public static ServiceOperationResult<T> Success(T result) => new() { Result = result };

    public static ServiceOperationResult<T> Failure(params ErrorCode[] errorCodes) => new() { ErrorCodes = [.. errorCodes] };

    private static string GetMessage(ErrorCode code) => code switch
    {
        ErrorCode.InvalidRequest => "The request is not valid.",
        ErrorCode.InvalidMakeId => "Make id must be a positive number.",
        ErrorCode.InvalidYear => "Model year must be between 1981 and next year.",
        ErrorCode.KeywordTooShort => "Type at least 2 characters to search for a make.",
        ErrorCode.MakeNotFound => "Make was not found.",
        ErrorCode.UpstreamUnavailable => "The vehicle data service is not available right now. Please try again shortly.",
        ErrorCode.RateLimited => "Too many requests. Please wait a few seconds and try again.",
        _ => "Something went wrong."
    };
}
