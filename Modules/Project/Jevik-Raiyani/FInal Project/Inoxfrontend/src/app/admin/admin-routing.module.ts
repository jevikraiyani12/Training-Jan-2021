import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CinemaComponent } from './cinema/cinema.component';
import { MovieComponent } from './movie/movie.component';
import { PaymentComponent } from './payment/payment.component';
import { ScreenComponent } from './screen/screen.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'cinema/:id', component: CinemaComponent },
  { path: 'screen', component: ScreenComponent },
  { path: 'history/:id', component: TicketComponent },
  { path: 'paymentType/:id', component: PaymentComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
