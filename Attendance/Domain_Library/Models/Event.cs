using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class Event : BaseEntity
    {

        public string EventName { get; set; }
        public string eventtype { get; set; }
        public DateTime DateTime { get; set; }
        public DateTime EventDateTime { get; set; }
      
        public int UserId { get; set; }
        public string Mentor { get; set; }

        [JsonIgnore]

        public User User { get; set; }


        
    }
}
