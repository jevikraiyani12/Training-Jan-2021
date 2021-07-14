import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MovieComponent } from './movie/movie.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { CinemaComponent } from './cinema/cinema.component';
import { ScreenComponent } from './screen/screen.component';
import { TicketComponent } from './ticket/ticket.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    AdminComponent,
    MovieComponent,
    CinemaComponent,
    ScreenComponent,
    TicketComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
