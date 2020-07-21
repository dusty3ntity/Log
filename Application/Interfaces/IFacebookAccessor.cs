using System.Threading.Tasks;
using Application.Users;

namespace Application.Interfaces
{
    public interface IFacebookAccessor
    {
        Task<FacebookUserInfo> FacebookLogin(string accessToken);
    }
}