using Core.Enums;
using Core.Settings;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Services;
using Web.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSerilog(logger => logger.ReadFrom.Configuration(builder.Configuration));
builder.Services.AddServices(builder.Configuration);
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options => options.InvalidModelStateResponseFactory = _ =>
        new BadRequestObjectResult(ServiceOperationResult<object>.Failure(ErrorCode.InvalidRequest)));
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.AddHealthChecks();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseSerilogRequestLogging();
app.UseExceptionHandler();

// Configure the HTTP request pipeline.
app.MapOpenApi();
app.UseSwaggerUI(options => options.SwaggerEndpoint("/openapi/v1.json", "Vehicle Explorer API"));

app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
