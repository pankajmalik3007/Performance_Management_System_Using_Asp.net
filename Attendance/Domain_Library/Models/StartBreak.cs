using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain_Library.Models
{
    public class StartBreak : BaseEntity
    {
        public DateTime startbreak { get; set; }
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        public virtual List<Report> Reports { get; set; }

    }
}
