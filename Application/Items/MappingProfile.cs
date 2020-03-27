using AutoMapper;
using Domain;

namespace Application.Items
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Item, ItemDto>();
        }
    }
}