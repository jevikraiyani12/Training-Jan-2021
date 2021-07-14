import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentTypeService } from 'src/app/services/payment-type.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { VCinemaScreenService } from 'src/app/services/v-cinema-screen.service';
import { VSeatService } from 'src/app/services/vseat.service';
import { VspPerticularShowSeatDetailService } from 'src/app/services/vsp-perticular-show-seat-detail.service';

@Component({
  selector: 'app-user-detail-of-seat',
  templateUrl: './user-detail-of-seat.component.html',
  styleUrls: ['./user-detail-of-seat.component.css']
})
export class UserDetailOfSeatComponent implements OnInit {
  showId:number
  WantBook 
  SeatDetails
  TotalCartValue: number = 0

  paymentDetail : string = "xxxx-xxxx"

  payId = 1
  LocalPaymentMethods
  constructor(private activeRoute:ActivatedRoute,
              private ticket: TicketsService,
              private router:Router,
              private vSeat: VSeatService,
              private paymentMethod:PaymentTypeService,
              private vspPerticularShowSeatDetailService:VspPerticularShowSeatDetailService) { }

  ngOnInit(): void {
    this.showId = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    //console.log(this.showId)
    this.WantBook = this.activeRoute.snapshot.paramMap.get('SeatArray');
    this.WantBook = this.WantBook.substring(1, this.WantBook.length - 1).split(',').map(Number)
   // console.log(this.WantBook)

    // this.vSeat.getAll().subscribe(data => {
    //   this.SeatDetails = data
    //     .filter(o1 => this.WantBook.find(o2=>o1.seatId == o2))
    //     //console.log(this.SeatDetails)
    // })
    
    this.paymentMethod.getAll().subscribe(data=>{
      this.LocalPaymentMethods =data
    })

    this.vspPerticularShowSeatDetailService.getById(this.showId).subscribe(data=>{
      this.SeatDetails = data.filter(o1 => this.WantBook.some(o2 => o1.seatId ===parseInt(o2)));
     // console.log(this.SeatDetails)

      this.TotalCartValue = this.SeatDetails.reduce((sum, current) => sum + current.price, 0);
     // console.log(this.TotalCartValue)
    })   
  }

  onSelectType(id){
    this.payId= id
   // console.log(this.payId)
  }

  book(){
     if(this.payId == 0){
       alert('Choose payment Method')
       return;
     }
     if(this.paymentDetail.trim() == ''){
      alert('Enter payment Detail')
       return
     }
     if(this.paymentDetail.trim().length > 10){
      alert('Payment Detail should contain 10 char')
       return
     }
     for (const i of this.SeatDetails) {
      {
        this.ticket.create(
          { 
            showTimeId: this.showId,
            seatId: i.seatId,
            price: i.price,
            userGmail: localStorage.getItem('userGmail'), 
            paymentId: this.payId,
            paymentDetail: this.paymentDetail,
            date: new Date()  
          }
        ).subscribe(data => {
          console.log(data)
          alert('Booking SuccessFully')
          this.router.navigate(['home'])
        },err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 409) {
              alert('Too late')
              return
            }
          } 
        });
      }
    }
  
  }
}
