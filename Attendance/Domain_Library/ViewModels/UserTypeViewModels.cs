using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public  class UserTypeViewModels
    {
        public int Id { get; set; }
        public string Type { get; set; }


    }
    public class UserTypeInsertModel
    {
        [Required(ErrorMessage = "User Type is required...!")]
        [StringLength(10)]
        public string Type { get; set; }
    }
    public class UserTypeUpdateModel : UserTypeInsertModel
    {
        [Required(ErrorMessage = "Id is neccessory for updation...!")]
        public int Id { get; set; }

    }
}
