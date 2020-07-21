using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Users;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Infrastructure.Security
{
    public class GoogleAccessor : IGoogleAccessor
    {
        private readonly IOptions<GoogleAppSettings> _config;
        private readonly HttpClient _httpClient;

        public GoogleAccessor(IOptions<GoogleAppSettings> config)
        {
            _config = config;
            _httpClient = new HttpClient
            {
                BaseAddress = new System.Uri("https://oauth2.googleapis.com/"),
            };
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async Task<GoogleUserInfo> GoogleLogin(string accessCode)
        {
            var requestData = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("client_id", _config.Value.ClientId),
                new KeyValuePair<string, string>("client_secret", _config.Value.ClientSecret),
                new KeyValuePair<string, string>("redirect_uri", "http://localhost:3000"),
                new KeyValuePair<string, string>("grant_type", "authorization_code"),
                new KeyValuePair<string, string>("code", accessCode),
            });

            var verifyToken = await _httpClient.PostAsync("token", requestData);

            if (!verifyToken.IsSuccessStatusCode)
                return null;

            var response = await verifyToken.Content.ReadAsStringAsync();
            var serializedResponse = JsonConvert.DeserializeObject<GoogleAuthResponse>(response);

            var user = await GetUserAsync(serializedResponse.Id_Token);

            return user;
        }

        private class GoogleAuthResponse
        {
            public string Id_Token { get; set; }
        }

        private async Task<GoogleUserInfo> GetUserAsync(string tokenId)
        {
            var response = await _httpClient.GetAsync($"tokeninfo?id_token={tokenId}");

            if (!response.IsSuccessStatusCode)
                return null;

            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<GoogleUserInfo>(result);
        }
    }
}