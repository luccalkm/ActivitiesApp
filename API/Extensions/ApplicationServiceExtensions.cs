using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // Connect to database e.g. option.useMysql(...)
            services.AddDbContext<DataContext>(option => 
            {
                option.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });

            // Add CORS policy to accept any method from the Front-End
            services.AddCors(option => {
                option.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyMethod()
                        .AllowAnyHeader()
                        .WithOrigins("http://localhost:3000");
                });
            });

            // Setting up the standard place do lookup all handlers and register them 
            // Put a handler so it knows where its located and where to look
            services.AddMediatR(typeof(ListActivities.Handler));

            // Setting standard element for finding mappers.
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}