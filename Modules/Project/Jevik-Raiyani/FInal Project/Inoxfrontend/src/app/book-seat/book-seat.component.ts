import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVspPerticularShowSeatDetail } from '../services/IVspPerticularShowSeatDetail';
import { TicketsService } from '../services/tickets.service';
import { VspPerticularShowSeatDetailService } from '../services/vsp-perticular-show-seat-detail.service';

@Component({
  selector: 'app-book-seat',
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.css']
})
export class BookSeatComponent implements OnInit {

  ShowSeatArray: IVspPerticularShowSeatDetail[] = []
  TotaRowNo: number[] = []

  ShowId: number 
  WantBook: number[] = []

  TotalAvailableSeat
  TotalAvailableSeatTypes
  AvailableSeatDataByType

  constructor(private route: ActivatedRoute,
    private routenavigate: Router,
    private ticket: TicketsService,
    private vspPerticularShowSeatDetailService: VspPerticularShowSeatDetailService) { }

  ngOnInit(): void {
    this.ShowId = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log(this.ShowId)

    this.vspPerticularShowSeatDetailService.getById(this.ShowId).subscribe(data => {
      this.ShowSeatArray = data
      console.log(this.ShowSeatArray)
      
      this.TotalAvailableSeat = this.ShowSeatArray.filter(x=>x.flag == 0);
      //console.log(this.TotalAvailableSeat)

      this.TotalAvailableSeatTypes = this.uniqueByKey(this.TotalAvailableSeat,'seatTypeId')
      //console.log(this.TotalAvailableSeatTypes)
      if(this.TotalAvailableSeatTypes.length == 0){
        alert('Show is full')
      }
      
      this.TotaRowNo = this.ShowSeatArray.map(x => x.rowNo)
        .filter((value, index, self) => self.indexOf(value) === index)
      // console.log(this.TotaRowNo)
    })
  }
  uniqueByKey(array, key) {
    return [...new Map(array.map((x) => [x[key], x])).values()];
  }
  AvaliableSeatForPerticularType(seatTypeId){
    return  this.TotalAvailableSeat.filter(x => x.seatTypeId == seatTypeId).length
  }

  onSelect(seatid) {
    //console.log(seatid)
    let intSeatid = parseInt(seatid)
    this.WantBook.push(intSeatid)

    if (this.WantBook.filter(x => x == intSeatid).length % 2 == 0) {

      this.WantBook = this.WantBook.filter(x => x != intSeatid)
    }
     // console.log(this.WantBook)

  }
  getHeight(id) {
    if (id == 1) {
      return '30px'
    }
    if (id == 2) {
      return '40px'
    }
  }
  paddingleft(id) {
    if (id == 1) {
      return '15px'
    }
    if (id == 2) {
      return '20px'
    }
  }

  book() {
    //console.log(this.WantBook.length)
    if (this.WantBook.length == 0) {
      alert('Select Seat')
      return;
    }
    this.ticket.getAll().subscribe(res => {
      this.routenavigate.navigate(['booknow/BookSeat/UserDetail', this.ShowId, JSON.stringify(this.WantBook)])
    },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.routenavigate.navigate(['/login'])
          }
        }
      })
  }
}