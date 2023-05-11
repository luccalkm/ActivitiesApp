using API.Extensions;
using API.Middleware;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Method to center all the services created.
builder.Services.AddAplicationServices(builder.Configuration);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

// Use the CORS Policy created (should be before Authorization!!!)
app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;


// Create the database service
try
{
    var context = services.GetRequiredService<DataContext>();
    // Migrate transactions and execute them if needed
    await context.Database.MigrateAsync();
    // Get seed data into context var, referencing the DataContext, therefore, the database.
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    // Logging error and etc.
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration.");
}

app.Run();