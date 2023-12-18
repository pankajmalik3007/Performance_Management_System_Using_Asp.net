using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library
{
    public  class UserType : BaseEntity
    {
        [Required(ErrorMessage = "Please Enter UserType...!")]
        [StringLength(100)]
        public string Type { get; set; }

      
        public virtual List<User> Users { get; set; }
    }
}
