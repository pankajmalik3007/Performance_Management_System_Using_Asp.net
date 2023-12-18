using Domain_Library;
using Domain_Library.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra_Library.Context
{
    public class MainDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<ClockoutTime> ClockoutTimes { get; set; }
        public DbSet<StartBreak> StartBreaks { get; set; }
        public DbSet<FinishBreak> FinishBreaks { get; set; }
        public DbSet<ManualRequest> ManualRequests { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<ForgotPassword> ForgotPasswords { get; set; }
        public DbSet<VerifyOtp> VerifyOtps { get; set; }
        public DbSet<ResetPassword> ResetPasswords { get; set; }

       

        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            
            modelBuilder.Entity<User>()
                 .HasOne(u => u.UserType)
                 .WithMany(ut => ut.Users)
                 .HasForeignKey(u => u.UserTypeId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                  .HasMany(user => user.ForgotPassword)
                  .WithOne(forgotPassword => forgotPassword.User)
                  .HasForeignKey(forgotPassword => forgotPassword.UserId)
                  .OnDelete(DeleteBehavior.Restrict);

            
            modelBuilder.Entity<ForgotPassword>()
                .HasOne(forgotPassword => forgotPassword.VerifyOtp)
                .WithOne(verifyOtp => verifyOtp.ForgotPassword)
                .HasForeignKey<VerifyOtp>(verifyOtp => verifyOtp.ForgotPasswordId)
                .OnDelete(DeleteBehavior.Restrict);

            
            modelBuilder.Entity<VerifyOtp>()
                .HasOne(verifyOtp => verifyOtp.ResetPassword)
                .WithOne(resetPassword => resetPassword.VerifyOtp)
                .HasForeignKey<ResetPassword>(resetPassword => resetPassword.VerifyOtpId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Attendance>()
                .HasOne(a => a.User)
                .WithMany(u => u.Attendance)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);
          
            modelBuilder.Entity<Event>()
               .HasOne(a => a.User)
               .WithMany(u => u.Events)
               .HasForeignKey(a => a.UserId)
               .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<ManualRequest>()
                .HasOne(a => a.User)
                .WithMany(u => u.ManualRequest)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<ClockoutTime>()
                .HasOne(ct => ct.User)
                .WithMany(u => u.ClockoutTime)
                .HasForeignKey(ct => ct.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            
            modelBuilder.Entity<StartBreak>()
                .HasOne(sb => sb.User)
                .WithMany(u => u.StartBreak)
                .HasForeignKey(sb => sb.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            
            modelBuilder.Entity<FinishBreak>()
                .HasOne(fb => fb.User)
                .WithMany(u => u.FinishBreak)
                .HasForeignKey(fb => fb.UserId)
                .OnDelete(DeleteBehavior.Restrict);

           
            modelBuilder.Entity<Leave>()
                .HasOne(l => l.User)
                .WithMany(u => u.Leave)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.Restrict);

           
            modelBuilder.Entity<Report>()
                .HasOne(r => r.User)
                .WithMany(u => u.Report)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

           
            modelBuilder.Entity<Report>()
                .HasOne(r => r.ClockoutTime)
                .WithMany(ct => ct.Reports)
                .HasForeignKey(r => r.CheckoutTimeId)
                .OnDelete(DeleteBehavior.Restrict);

           
            modelBuilder.Entity<Report>()
                .HasOne(r => r.Attendance)
                .WithMany(a => a.Report)
                .HasForeignKey(r => r.AttendanceId)
                .OnDelete(DeleteBehavior.Restrict);

           
            modelBuilder.Entity<Report>()
                .HasOne(r => r.AttendBreak)
                .WithMany(sb => sb.Reports)
                .HasForeignKey(r => r.StartBreakId)
                .OnDelete(DeleteBehavior.Restrict);

           
            modelBuilder.Entity<Report>()
                .HasOne(r => r.FinishBreak)
                .WithMany(fb => fb.Reports)
                .HasForeignKey(r => r.FinishBreakID)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(modelBuilder);
        }
    }
    }

