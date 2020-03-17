using AutoMapper;
using Domain;

namespace Application.Dictionaries
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Dictionary, DictionaryDto>();
        }
    }
}