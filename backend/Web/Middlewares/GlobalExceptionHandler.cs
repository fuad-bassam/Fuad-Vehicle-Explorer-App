using Core.Enums;
using Core.Settings;
using Microsoft.AspNetCore.Diagnostics;

namespace Web.Middlewares;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        logger.LogError(exception, "Unhandled exception for {Method} {Path}", httpContext.Request.Method, httpContext.Request.Path);

        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await httpContext.Response.WriteAsJsonAsync(ServiceOperationResult<object>.Failure(ErrorCode.Unexpected), cancellationToken);

        return true;
    }
}
