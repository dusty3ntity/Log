using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AllowDeleteUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dictionaries_AspNetUsers_UserId",
                table: "Dictionaries");

            migrationBuilder.AddForeignKey(
                name: "FK_Dictionaries_AspNetUsers_UserId",
                table: "Dictionaries",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dictionaries_AspNetUsers_UserId",
                table: "Dictionaries");

            migrationBuilder.AddForeignKey(
                name: "FK_Dictionaries_AspNetUsers_UserId",
                table: "Dictionaries",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
