using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Connect to database e.g. option.useMysql(...)
builder.Services.AddDbContext<DataContext>(option => 
{
    option.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add CORS policy to accept any method from the Front-End
builder.Services.AddCors(option => {
    option.AddPolicy("CorsPolicy", policy => {
        policy.AllowAnyMethod()
              .AllowAnyHeader()
              .WithOrigins("http://localhost:3000");
    });
});

// Setting up the standard place do lookup all handlers and register them 
// Put a handler so it knows where its located and where to look
builder.Services.AddMediatR(typeof(ListActivities.Handler));

// Setting standard element for finding mappers.
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

var app = builder.Build();

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