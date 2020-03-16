using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    ISOCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LearningLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Size = table.Column<int>(nullable: false),
                    CompletedItemsCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearningLists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dictionaries",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    KnownLanguageId = table.Column<int>(nullable: true),
                    LanguageToLearnId = table.Column<int>(nullable: true),
                    WordsCount = table.Column<int>(nullable: false),
                    PhrasesCount = table.Column<int>(nullable: false),
                    LearnedItemsCount = table.Column<int>(nullable: false),
                    PreferredLearningListSize = table.Column<int>(nullable: false),
                    LearningListId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dictionaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dictionaries_Languages_KnownLanguageId",
                        column: x => x.KnownLanguageId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Dictionaries_Languages_LanguageToLearnId",
                        column: x => x.LanguageToLearnId,
                        principalTable: "Languages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Dictionaries_LearningLists_LearningListId",
                        column: x => x.LearningListId,
                        principalTable: "LearningLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Original = table.Column<string>(nullable: true),
                    Translation = table.Column<string>(nullable: true),
                    ItemType = table.Column<int>(nullable: false),
                    IsStarred = table.Column<bool>(nullable: false),
                    IsLearned = table.Column<bool>(nullable: false),
                    TotalRepeatsCount = table.Column<int>(nullable: false),
                    CorrectRepeatsCount = table.Column<int>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    GoesForNextDay = table.Column<bool>(nullable: false),
                    DictionaryId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Dictionaries_DictionaryId",
                        column: x => x.DictionaryId,
                        principalTable: "Dictionaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LearningItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    LearningMode = table.Column<int>(nullable: false),
                    NumberInSequence = table.Column<int>(nullable: false),
                    ItemId = table.Column<Guid>(nullable: true),
                    LearningListId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LearningItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LearningItems_Items_ItemId",
                        column: x => x.ItemId,
                        principalTable: "Items",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LearningItems_LearningLists_LearningListId",
                        column: x => x.LearningListId,
                        principalTable: "LearningLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dictionaries_KnownLanguageId",
                table: "Dictionaries",
                column: "KnownLanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_Dictionaries_LanguageToLearnId",
                table: "Dictionaries",
                column: "LanguageToLearnId");

            migrationBuilder.CreateIndex(
                name: "IX_Dictionaries_LearningListId",
                table: "Dictionaries",
                column: "LearningListId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_DictionaryId",
                table: "Items",
                column: "DictionaryId");

            migrationBuilder.CreateIndex(
                name: "IX_LearningItems_ItemId",
                table: "LearningItems",
                column: "ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_LearningItems_LearningListId",
                table: "LearningItems",
                column: "LearningListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LearningItems");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Dictionaries");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropTable(
                name: "LearningLists");
        }
    }
}
