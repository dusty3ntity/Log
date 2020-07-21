using System.Threading.Tasks;
using Application.Users;

namespace Application.Interfaces
{
    public interface IGoogleAccessor
    {
        Task<GoogleUserInfo> GoogleLogin(string accessCode);
    }
}