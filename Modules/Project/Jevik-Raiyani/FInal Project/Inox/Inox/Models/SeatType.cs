using System;
using System.Collections.Generic;

#nullable disable

namespace Inox.Models
{
    public partial class SeatType
    {
        public SeatType()
        {
            Seats = new HashSet<Seat>();
            ShowSeatPrices = new HashSet<ShowSeatPrice>();
        }

        public int SeatTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Seat> Seats { get; set; }
        public virtual ICollection<ShowSeatPrice> ShowSeatPrices { get; set; }
    }
}
