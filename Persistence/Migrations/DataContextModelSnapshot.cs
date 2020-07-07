﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1");

            modelBuilder.Entity("Domain.Dictionary", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("CorrectAnswersToItemCompletion")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsHardModeEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsMain")
                        .HasColumnType("INTEGER");

                    b.Property<int>("KnownLanguageId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LanguageToLearnId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LearnedPhrasesCount")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LearnedWordsCount")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("LearningListId")
                        .HasColumnType("TEXT");

                    b.Property<int>("PhrasesCount")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PreferredLearningListSize")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WordsCount")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("KnownLanguageId");

                    b.HasIndex("LanguageToLearnId");

                    b.ToTable("Dictionaries");
                });

            modelBuilder.Entity("Domain.Item", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("CorrectAnswersCount")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CorrectAnswersToCompletionCount")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Definition")
                        .HasColumnType("TEXT");

                    b.Property<string>("DefinitionOrigin")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("DictionaryId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("GoesForNextDay")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsLearned")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsStarred")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Original")
                        .HasColumnType("TEXT");

                    b.Property<int>("TotalRepeatsCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Translation")
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("DictionaryId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("Domain.Language", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ISOCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("Domain.LearningItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("ItemId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("LearningListId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LearningMode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("NumberInSequence")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ItemId")
                        .IsUnique();

                    b.HasIndex("LearningListId");

                    b.ToTable("LearningItems");
                });

            modelBuilder.Entity("Domain.LearningList", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("CompletedItemsCount")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CorrectAnswersCount")
                        .HasColumnType("INTEGER");

                    b.Property<int>("CorrectAnswersToItemCompletion")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("DictionaryId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsHardModeEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Size")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TimesCompleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TotalCompletedItemsCount")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DictionaryId")
                        .IsUnique();

                    b.ToTable("LearningLists");
                });

            modelBuilder.Entity("Domain.Dictionary", b =>
                {
                    b.HasOne("Domain.Language", "KnownLanguage")
                        .WithMany()
                        .HasForeignKey("KnownLanguageId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Domain.Language", "LanguageToLearn")
                        .WithMany()
                        .HasForeignKey("LanguageToLearnId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Item", b =>
                {
                    b.HasOne("Domain.Dictionary", "Dictionary")
                        .WithMany("Items")
                        .HasForeignKey("DictionaryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.LearningItem", b =>
                {
                    b.HasOne("Domain.Item", "Item")
                        .WithOne()
                        .HasForeignKey("Domain.LearningItem", "ItemId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Domain.LearningList", "LearningList")
                        .WithMany("LearningItems")
                        .HasForeignKey("LearningListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.LearningList", b =>
                {
                    b.HasOne("Domain.Dictionary", "Dictionary")
                        .WithOne("LearningList")
                        .HasForeignKey("Domain.LearningList", "DictionaryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
