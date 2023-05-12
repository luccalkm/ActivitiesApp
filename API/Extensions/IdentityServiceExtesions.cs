using Domain;
using Persistence;
using API.Services;

namespace API.Extensions
{
  public static class IdentityServiceExtesions
  {
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddIdentityCore<AppUser>(opt =>
      {
        opt.Password.RequireNonAlphanumeric = false;
      })
      .AddEntityFrameworkStores<DataContext>();

      services.AddAuthentication();

      services.AddScoped<TokenService>();

      return services;
    }
  }
}