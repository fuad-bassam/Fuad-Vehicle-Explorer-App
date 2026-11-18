using Core.DTOs;
using Core.DTOs.Vehicles;
using Core.Enums;
using Core.Services.Vehicles;
using Core.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Web.Controllers.Vehicles;

[ApiController]
[Route("api/makes")]
[EnableRateLimiting(RateLimitOptions.PolicyName)]
public class MakesController(IVehicleService vehicleService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ServiceOperationResult<List<MakeForList>>>> SearchAsync(string? keyword, CancellationToken cancellationToken)
    {
        var result = await vehicleService.SearchMakesAsync(keyword, cancellationToken);
        return ToResponse(result);
    }

    [HttpGet("all")]
    public async Task<ActionResult<ServiceOperationResult<PagedList<MakeForList>>>> GetAllAsync(int page = 1, int pageSize = 20, CancellationToken cancellationToken = default)
    {
        var result = await vehicleService.GetMakesPageAsync(page, pageSize, cancellationToken);
        return ToResponse(result);
    }

    [HttpGet("{makeId}")]
    public async Task<ActionResult<ServiceOperationResult<MakeForList>>> GetMakeAsync(int makeId, CancellationToken cancellationToken)
    {
        var result = await vehicleService.GetMakeAsync(makeId, cancellationToken);
        return ToResponse(result);
    }

    [HttpGet("{makeId}/vehicle-types")]
    public async Task<ActionResult<ServiceOperationResult<List<VehicleTypeForList>>>> GetVehicleTypesAsync(int makeId, CancellationToken cancellationToken)
    {
        var result = await vehicleService.GetVehicleTypesAsync(makeId, cancellationToken);
        return ToResponse(result);
    }

    [HttpGet("{makeId}/models")]
    public async Task<ActionResult<ServiceOperationResult<List<ModelForList>>>> GetModelsAsync(int makeId, int year, string? vehicleType, CancellationToken cancellationToken)
    {
        var result = await vehicleService.GetModelsAsync(makeId, year, vehicleType, cancellationToken);
        return ToResponse(result);
    }

    private ObjectResult ToResponse<T>(ServiceOperationResult<T> result)
    {
        if (result.IsSuccessful)
        {
            return Ok(result);
        }

        if (result.ErrorCodes.Contains(ErrorCode.UpstreamUnavailable))
        {
            return StatusCode(StatusCodes.Status502BadGateway, result);
        }

        if (result.ErrorCodes.Contains(ErrorCode.MakeNotFound))
        {
            return NotFound(result);
        }

        return BadRequest(result);
    }
}
