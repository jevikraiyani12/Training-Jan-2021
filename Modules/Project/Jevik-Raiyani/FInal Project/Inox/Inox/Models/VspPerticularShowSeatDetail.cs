using System;
using System.Collections.Generic;

#nullable disable

namespace Inox.Models
{
    public partial class VspPerticularShowSeatDetail
    {
        public int ShowTimeId { get; set; }
        public int MovieId { get; set; }
        public int ScreenId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public int SeatId { get; set; }
        public int SeatNo { get; set; }
        public int RowId { get; set; }
        public int RowNo { get; set; }
        public int SeatTypeId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Flag { get; set; }
    }
}
