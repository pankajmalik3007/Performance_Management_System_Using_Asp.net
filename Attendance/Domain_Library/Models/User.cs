using Domain_Library;
using Domain_Library.Models;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class User : BaseEntity
{
   
    public string Username { get; set; }

    
    public string Password { get; set; }

   
    public string Email { get; set; }

    public string PhoneNo { get; set; }

   
    public string Adress { get; set; }
    public int UserTypeId { get; set; }
    public string Role { get; set; }

    [JsonIgnore]
    public UserType UserType { get; set; }
    public virtual List<Leave> Leave { get; set; }
    public virtual List<Attendance> Attendance { get; set; }
    public virtual List<Report> Report { get; set; }
    public virtual List<ClockoutTime> ClockoutTime { get; set; }
    public virtual List<StartBreak> StartBreak { get; set; }                                                                                        
    public virtual List<FinishBreak> FinishBreak { get; set; }

    public virtual List<ManualRequest> ManualRequest { get; set; }
    public virtual List<ForgotPassword> ForgotPassword { get; set; }

    public virtual List<Event> Events { get; set; }

}
