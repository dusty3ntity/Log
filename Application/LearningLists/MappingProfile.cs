using AutoMapper;
using Domain;

namespace Application.LearningLists
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<LearningList, LearningListDto>();
        }
    }
}