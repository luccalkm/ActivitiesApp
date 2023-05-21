using Application.Activities;
using Application.Comments;
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

			CreateMap<Activity, ActivityDto>()
					.ForMember(display => display.HostUsername, opt => opt.MapFrom(src => src.Attendees.FirstOrDefault(x => x.isHost).AppUser.UserName));

			CreateMap<ActivityAttendee, AttendeeDto>()
					.ForMember(display => display.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
					.ForMember(display => display.Username, opt => opt.MapFrom(src => src.AppUser.UserName))
					.ForMember(display => display.Bio, opt => opt.MapFrom(src => src.AppUser.Bio))
					.ForMember(display => display.Image, options => options.MapFrom(src => src.AppUser.Photos.FirstOrDefault(photo => photo.IsMain).Url));

			CreateMap<AppUser, Profiles.Profile>()
					.ForMember(display => display.Image, options => options.MapFrom(src => src.Photos.FirstOrDefault(photo => photo.IsMain).Url));

			CreateMap<Comment, CommentDto>()
					.ForMember(display => display.DisplayName, opt => opt.MapFrom(src => src.Author.DisplayName))
					.ForMember(display => display.Username, opt => opt.MapFrom(src => src.Author.UserName))
					.ForMember(display => display.Image, options => options.MapFrom(src => src.Author.Photos.FirstOrDefault(photo => photo.IsMain).Url));
		}
	}
}