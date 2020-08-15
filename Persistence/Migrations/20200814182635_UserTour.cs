using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class UserTour : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ItemsTourCompleted",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "LearningTourCompleted",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "NewItemTourCompleted",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "TourCompleted",
                table: "AspNetUsers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItemsTourCompleted",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LearningTourCompleted",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "NewItemTourCompleted",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TourCompleted",
                table: "AspNetUsers");
        }
    }
}
