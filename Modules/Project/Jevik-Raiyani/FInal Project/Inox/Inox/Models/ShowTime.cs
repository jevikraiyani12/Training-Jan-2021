using System;
using System.Collections.Generic;

#nullable disable

namespace Inox.Models
{
    public partial class ShowTime
    {
        public ShowTime()
        {
            ShowSeatPrices = new HashSet<ShowSeatPrice>();
            Tickets = new HashSet<Ticket>();
        }

        public int ShowTimeId { get; set; }
        public int MovieId { get; set; }
        public int ScreenId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }

        public virtual Movie Movie { get; set; }
        public virtual Screen Screen { get; set; }
        public virtual ICollection<ShowSeatPrice> ShowSeatPrices { get; set; }
        public virtual ICollection<Ticket> Tickets { get; set; }
    }
}
