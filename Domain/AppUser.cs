using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public AppUser()
        {
            Dictionaries = new List<Dictionary>();
        }
        
        public string DisplayName { get; set; }

        public ICollection<Dictionary> Dictionaries { get; set; }

        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }
    }
}