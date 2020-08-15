namespace Application.Users
{
    public class User
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }

        public string Avatar { get; set; }
        
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        
        public bool TourCompleted { get; set; }
        public bool ItemsTourCompleted { get; set; }
        public bool NewItemTourCompleted { get; set; }
        public bool LearningTourCompleted { get; set; }
    }
}