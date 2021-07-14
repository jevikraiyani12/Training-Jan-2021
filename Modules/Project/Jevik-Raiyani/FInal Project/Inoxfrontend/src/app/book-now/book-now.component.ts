import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovies } from '../services/IMovies';
import { IvCinemaScreen } from '../services/IvCinemaScreen';
import { IvDirectorCast } from '../services/IvDirectorCast';
import { MoviesService } from '../services/movies.service';
import { VCinemaScreenService } from '../services/v-cinema-screen.service';
import { VDirectorCastService } from '../services/vdirector-cast.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent implements OnInit {

  DateNow = Date.now
  movieId;

  DateFlag: boolean
  zeroShowFlag : boolean =false

  thisMovieCast: IvDirectorCast[] = [];
  thisMovie: IMovies = null

  movieShow: IvCinemaScreen[] = [];

  BookyourSeat: IvCinemaScreen[] = []
  BookyourSeatFinal: IvCinemaScreen[] = []

  UniqueCity
  UniqueCinema;
  TodayDate: number;
  TomorrowDate: number;
  TomorrowDate1: number;
  TomorrowDate2: number;
  BookyourSeatDate: IvCinemaScreen[];

  onSelectDateFlag: number = 0
  onSelecttimeFlag: number = 0
  NoDataFoundFlag : Boolean = false

  constructor(private route: ActivatedRoute,
    private movieCast: VDirectorCastService,
    private movie: MoviesService,
    private show: VCinemaScreenService) { }

  ngOnInit(): void {
    this.movieId = parseInt(this.route.snapshot.paramMap.get('id'));

    this.movieCast.getAll().subscribe(data => {
      this.thisMovieCast = data.filter(x => x.movieId == this.movieId)
    })

    this.movie.getById(this.movieId).subscribe((data: IMovies) => {
      this.thisMovie = data

      if (new Date().getTime() > new Date(this.thisMovie?.releaseDate).getTime()) {
        this.DateFlag = true;
      }
    })
    this.TodayDate = new Date(new Date(new Date()).toJSON().slice(0, 10).replace(/-/g, '/')).getTime()
    this.TomorrowDate = this.TodayDate + 86400000
    this.TomorrowDate1 = this.TomorrowDate + 86400000
    this.TomorrowDate2 = this.TomorrowDate1 + 86400000

    this.show.getAll().subscribe(data => {
      this.movieShow = data.filter(x => x.movieId == this.movieId)
        .filter(x => new Date(x.date).getTime() + new Date(x.startTime.totalMilliseconds).getTime()
          >= new Date().getTime() + 7200000
        ).sort((a, b) => {
          return new Date(a.startTime.milliseconds).getTime() - new Date(b.startTime.milliseconds).getTime();
        }).sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
       if(this.movieShow.length == 0){ 
         this.zeroShowFlag = true
       }
      

      this.UniqueCity = this.uniqueByKey(this.movieShow, 'cinemaCity')
      // console.log(this.UniqueCity)


    })



  }
  uniqueByKey(array, key) {
    return [...new Map(array.map((x) => [x[key], x])).values()];
  }


  onSelect(city) {
    this.UniqueCinema = this.movieShow.filter(x => x.cinemaCity == city)
    // console.log(this.UniqueCinema)
    this.UniqueCinema = this.uniqueByKey(this.UniqueCinema, 'cinemaName')
  }

  onSelectCinema(cinema) {
    this.BookyourSeat = this.movieShow.filter(o1 => this.UniqueCinema.some(o2 => o1.cinemaCity === o2.cinemaCity) &&
      o1.cinemaName == cinema);

    // for (const i of this.BookyourSeat) {
    //   //console.log(i.showTimeId)
    // }
    //console.log(this.BookyourSeat)
    // this.BookyourSeatDate = this.BookyourSeat.filter(x=>new Date(x.date).getTime() == this.TodayDate)
    //this.BookyourSeatFinal = this.BookyourSeatDate

  }
  onSelectDate(date) {
    this.onSelectDateFlag = date
   // console.log(this.onSelectDateFlag)
    
  }
  onSelecttime(time) {
    this.onSelecttimeFlag = time
   // console.log(this.onSelecttimeFlag)
    
  }
  onSearch() {
    if(this.BookyourSeat.length == 0){
      alert('Select your City and Cinema')
      return
    }
    if(this.onSelectDateFlag == 0){
      alert('Select Date')
      return
    }
    if(this.onSelecttimeFlag == 0){
      alert('Select Time')
      return
    }
    if(this.onSelectDateFlag == 1){
      this.BookyourSeatDate =this.BookyourSeat.filter(x=>new Date(x.date).getTime() == this.TodayDate)
    }
    if(this.onSelectDateFlag  == 2){
      this.BookyourSeatDate =this.BookyourSeat.filter(x=>new Date(x.date).getTime() == this.TomorrowDate )
    }
    if(this.onSelectDateFlag  == 3){
      this.BookyourSeatDate =this.BookyourSeat.filter(x=>new Date(x.date).getTime() == this.TomorrowDate1 )
    }
    if(this.onSelectDateFlag  == 4){
      this.BookyourSeatDate =this.BookyourSeat.filter(x=>new Date(x.date).getTime() == this.TomorrowDate2 )
    }
    if(this.onSelectDateFlag  == 5){
      this.BookyourSeatDate =this.BookyourSeat.filter(x=>new Date(x.date).getTime() > this.TomorrowDate2 )
    }
    
    if(this.onSelecttimeFlag == 1){
      this.BookyourSeatFinal =  this.BookyourSeatDate.filter(x=> x.startTime.hours <12 && x.startTime.hours >= 6)
    }
    if(this.onSelecttimeFlag == 2){
      this.BookyourSeatFinal =  this.BookyourSeatDate.filter(x=> x.startTime.hours <18 && x.startTime.hours >= 12)
    }
    if(this.onSelecttimeFlag == 3){
      this.BookyourSeatFinal =  this.BookyourSeatDate.filter(x=> x.startTime.hours <24 && x.startTime.hours >= 18)
    }
    if(this.onSelecttimeFlag == 4){
      this.BookyourSeatFinal =  this.BookyourSeatDate.filter(x=> x.startTime.hours <6 && x.startTime.hours >= 0)
    }   


    if(this.BookyourSeatFinal.length == 0){
      this.NoDataFoundFlag = true
    }else{
      this.NoDataFoundFlag = false
    }
    //console.log(this.NoDataFoundFlag)
  }

}
