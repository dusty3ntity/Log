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

                    b.Property<bool>("IsMain")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("KnownLanguageId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("LanguageToLearnId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("LearnedItemsCount")
                        .HasColumnType("INTEGER");

                    b.Property<Guid?>("LearningListId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
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

                    b.HasIndex("LearningListId");

                    b.ToTable("Dictionaries");
                });

            modelBuilder.Entity("Domain.Item", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int>("CorrectRepeatsCount")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<Guid?>("DictionaryId")
                        .HasColumnType("TEXT");

                    b.Property<bool>("GoesForNextDay")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsLearned")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsStarred")
                        .HasColumnType("INTEGER");

                    b.Property<int>("ItemType")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Original")
                        .HasColumnType("TEXT");

                    b.Property<int>("TotalRepeatsCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Translation")
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

                    b.Property<Guid?>("LearningListId")
                        .HasColumnType("TEXT");

                    b.Property<int>("LearningMode")
                        .HasColumnType("INTEGER");

                    b.Property<int>("NumberInSequence")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

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

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("TEXT");

                    b.Property<int>("Size")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("LearningLists");
                });

            modelBuilder.Entity("Domain.Dictionary", b =>
                {
                    b.HasOne("Domain.Language", "KnownLanguage")
                        .WithMany()
                        .HasForeignKey("KnownLanguageId");

                    b.HasOne("Domain.Language", "LanguageToLearn")
                        .WithMany()
                        .HasForeignKey("LanguageToLearnId");

                    b.HasOne("Domain.LearningList", "LearningList")
                        .WithMany()
                        .HasForeignKey("LearningListId");
                });

            modelBuilder.Entity("Domain.Item", b =>
                {
                    b.HasOne("Domain.Dictionary", null)
                        .WithMany("Items")
                        .HasForeignKey("DictionaryId");
                });

            modelBuilder.Entity("Domain.LearningItem", b =>
                {
                    b.HasOne("Domain.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemId");

                    b.HasOne("Domain.LearningList", null)
                        .WithMany("LearningItems")
                        .HasForeignKey("LearningListId");
                });
#pragma warning restore 612, 618
        }
    }
}
