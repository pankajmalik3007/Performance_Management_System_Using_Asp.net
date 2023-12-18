using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }

        
        public string Username { get; set; }

        [Required]
        [StringLength(50)]
        public string Password { get; set; }

      
        public string Email { get; set; }

       
        public string PhoneNo { get; set; }

  
        public string Adress { get; set; }
        public string Role { get; set; }
      
        public List<AttendanceViewModel> UserType { get; set; } = new List<AttendanceViewModel>();


    }
    public class UserInsertModel 
    {
       
        public string Username { get; set; }

        [Required]
        [StringLength(50)]
        public string Password { get; set; }

      
        public string Email { get; set; }

      
        public string PhoneNo { get; set; }

       
        public string Adress { get; set; }

        public int UserTypeId { get; set; }
        public string Role { get; set; }

    }

    public class  UserUpdateModel : UserInsertModel
       {
       
        public int Id { get; set; }

    }
    public class LoginModel
    {

      
        public string UserName { get; set; }

        [Required]
        [StringLength(50)]
        public string Password { get; set; }
    }

}
