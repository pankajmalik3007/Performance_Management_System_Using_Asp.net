using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain_Library.ViewModels
{
    public class EventviewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Evenetdatetime { get; set; }
    }

    public class EventInsertModel
    {
        public string Name { get; set; }
        public DateTime Evenetdatetime { get; set; }
    }
}
