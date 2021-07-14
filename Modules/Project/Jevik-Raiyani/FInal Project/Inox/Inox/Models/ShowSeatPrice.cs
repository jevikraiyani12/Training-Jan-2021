using System;
using System.Collections.Generic;

#nullable disable

namespace Inox.Models
{
    public partial class ShowSeatPrice
    {
        public int ShowSeatPriceId { get; set; }
        public int ShowTimeId { get; set; }
        public int SeatTypeId { get; set; }
        public double Price { get; set; }

        public virtual SeatType SeatType { get; set; }
        public virtual ShowTime ShowTime { get; set; }
    }
}
