using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // The entity Activity and the request Activity
            CreateMap<Activity, Activity>();
        }
    }
}