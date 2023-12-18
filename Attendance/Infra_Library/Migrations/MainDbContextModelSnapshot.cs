﻿// <auto-generated />
using System;
using Infra_Library.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infra_Library.Migrations
{
    [DbContext(typeof(MainDbContext))]
    partial class MainDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Domain_Library.Attendance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CheckInTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Attendances");
                });

            modelBuilder.Entity("Domain_Library.Leave", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("EndLeaveDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("LeaveRequestTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("LeaveStatusTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("LeaveType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartLeaveDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Leaves");
                });

            modelBuilder.Entity("Domain_Library.Models.ClockoutTime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("ClockOutTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ClockoutTimes");
                });

            modelBuilder.Entity("Domain_Library.Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("EventDateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mentor")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("eventtype")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Domain_Library.Models.FinishBreak", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("finishBreak")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("FinishBreaks");
                });

            modelBuilder.Entity("Domain_Library.Models.ForgotPassword", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("MobileNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ForgotPasswords");
                });

            modelBuilder.Entity("Domain_Library.Models.ManualRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BreakType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ClockInTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ClockOutTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmployeeRemark")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ManualRequests");
                });

            modelBuilder.Entity("Domain_Library.Models.ResetPassword", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NewPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("VerifyOtpId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("VerifyOtpId")
                        .IsUnique();

                    b.ToTable("ResetPasswords");
                });

            modelBuilder.Entity("Domain_Library.Models.StartBreak", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("startbreak")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("StartBreaks");
                });

            modelBuilder.Entity("Domain_Library.Models.VerifyOtp", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ForgotPasswordId")
                        .HasColumnType("int");

                    b.Property<string>("Otp")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ForgotPasswordId")
                        .IsUnique();

                    b.ToTable("VerifyOtps");
                });

            modelBuilder.Entity("Domain_Library.Report", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AttendanceId")
                        .HasColumnType("int");

                    b.Property<int>("CheckoutTimeId")
                        .HasColumnType("int");

                    b.Property<int>("FinishBreakID")
                        .HasColumnType("int");

                    b.Property<int>("StartBreakId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AttendanceId");

                    b.HasIndex("CheckoutTimeId");

                    b.HasIndex("FinishBreakID");

                    b.HasIndex("StartBreakId");

                    b.HasIndex("UserId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("Domain_Library.UserType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("UserTypes");
                });

            modelBuilder.Entity("User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Adress")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("UserTypeId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain_Library.Attendance", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany("Attendance")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain_Library.Leave", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany("Leave")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain_Library.Models.ClockoutTime", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany("ClockoutTime")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain_Library.Models.Event", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany("Events")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain_Library.Models.FinishBreak", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany("FinishBreak")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain_Library.Models.ForgotPassword", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany("ForgotPassword")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain_Library.Models.ManualRequest", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany("ManualRequest")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain_Library.Models.ResetPassword", b =>
                {
                    b.HasOne("Domain_Library.Models.VerifyOtp", "VerifyOtp")
                        .WithOne("ResetPassword")
                        .HasForeignKey("Domain_Library.Models.ResetPassword", "VerifyOtpId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("VerifyOtp");
                });

            modelBuilder.Entity("Domain_Library.Models.StartBreak", b =>
                {
                    b.HasOne("User", "User")
                        .WithMany("StartBreak")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain_Library.Models.VerifyOtp", b =>
                {
                    b.HasOne("Domain_Library.Models.ForgotPassword", "ForgotPassword")
                        .WithOne("VerifyOtp")
                        .HasForeignKey("Domain_Library.Models.VerifyOtp", "ForgotPasswordId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ForgotPassword");
                });

            modelBuilder.Entity("Domain_Library.Report", b =>
                {
                    b.HasOne("Domain_Library.Attendance", "Attendance")
                        .WithMany("Report")
                        .HasForeignKey("AttendanceId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Domain_Library.Models.ClockoutTime", "ClockoutTime")
                        .WithMany("Reports")
                        .HasForeignKey("CheckoutTimeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Domain_Library.Models.FinishBreak", "FinishBreak")
                        .WithMany("Reports")
                        .HasForeignKey("FinishBreakID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Domain_Library.Models.StartBreak", "AttendBreak")
                        .WithMany("Reports")
                        .HasForeignKey("StartBreakId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("User", "User")
                        .WithMany("Report")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("AttendBreak");

                    b.Navigation("Attendance");

                    b.Navigation("ClockoutTime");

                    b.Navigation("FinishBreak");

                    b.Navigation("User");
                });

            modelBuilder.Entity("User", b =>
                {
                    b.HasOne("Domain_Library.UserType", "UserType")
                        .WithMany("Users")
                        .HasForeignKey("UserTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("UserType");
                });

            modelBuilder.Entity("Domain_Library.Attendance", b =>
                {
                    b.Navigation("Report");
                });

            modelBuilder.Entity("Domain_Library.Models.ClockoutTime", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Domain_Library.Models.FinishBreak", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Domain_Library.Models.ForgotPassword", b =>
                {
                    b.Navigation("VerifyOtp")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain_Library.Models.StartBreak", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("Domain_Library.Models.VerifyOtp", b =>
                {
                    b.Navigation("ResetPassword")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain_Library.UserType", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("User", b =>
                {
                    b.Navigation("Attendance");

                    b.Navigation("ClockoutTime");

                    b.Navigation("Events");

                    b.Navigation("FinishBreak");

                    b.Navigation("ForgotPassword");

                    b.Navigation("Leave");

                    b.Navigation("ManualRequest");

                    b.Navigation("Report");

                    b.Navigation("StartBreak");
                });
#pragma warning restore 612, 618
        }
    }
}
