import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovies } from 'src/app/services/IMovies';
import { IvCinemaScreen } from 'src/app/services/IvCinemaScreen';
import { IvDirectorCast } from 'src/app/services/IvDirectorCast';
import { MoviesService } from 'src/app/services/movies.service';
import { VCinemaScreenService } from 'src/app/services/v-cinema-screen.service';
import { VDirectorCastService } from 'src/app/services/vdirector-cast.service';

@Component({
  selector: 'app-book-now-cinema',
  templateUrl: './book-now-cinema.component.html',
  styleUrls: ['./book-now-cinema.component.css']
})
export class BookNowCinemaComponent implements OnInit {
  movieId: number;
  cinemaCity: string;
  cinemaName: string;

  thisMovieCast: IvDirectorCast[] = [];

  thisMovie: IMovies = null
  DateFlag: boolean


  movieShow: IvCinemaScreen[] = [];
  movieShowFinal: IvCinemaScreen[] = [];
  BookyourSeat: IvCinemaScreen[] = []

  constructor(private activeRoute: ActivatedRoute,
    private movieCast: VDirectorCastService,
    private movie: MoviesService,
    private show: VCinemaScreenService) { }

  ngOnInit(): void {
    this.movieId = parseInt(this.activeRoute.snapshot.paramMap.get('movieid'));
   // console.log(this.movieId)
    this.cinemaCity = (this.activeRoute.snapshot.paramMap.get('cinemacity'));
    //console.log(this.cinemaCity)
    this.cinemaName = (this.activeRoute.snapshot.paramMap.get('cinemaname'));
   // console.log(this.cinemaName)

    this.movieCast.getAll().subscribe(data => {
      this.thisMovieCast = data.filter(x => x.movieId == this.movieId)
    })

    this.movie.getById(this.movieId).subscribe((data: IMovies) => {
      this.thisMovie = data

      if (new Date().getTime() > new Date(this.thisMovie?.releaseDate).getTime()) {
        this.DateFlag = true;
      }
    })

    this.show.getAll().subscribe(data => {
      this.movieShow = data.filter(x => x.movieId == this.movieId && x.cinemaName == this.cinemaName && x.cinemaCity == this.cinemaCity)
        .filter(x => new Date(x.date).getTime() + new Date(x.startTime.totalMilliseconds).getTime()
          >= new Date().getTime() + 7200000
        ).sort((a, b) => {
          return new Date(a.startTime.milliseconds).getTime() - new Date(b.startTime.milliseconds).getTime();
        }).sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        this.movieShowFinal = this.movieShow
    })
  }
  onSelecttime(time){
    if(time == 0){
      this.movieShowFinal =  this.movieShow
      return;
    }
    if(time == 1){
      this.movieShowFinal =  this.movieShow.filter(x=> x.startTime.hours <12 && x.startTime.hours >= 6)
      return;
    }
    if(time == 2){
      this.movieShowFinal =  this.movieShow.filter(x=> x.startTime.hours <18 && x.startTime.hours >= 12)
      return;
    }
    if(time == 3){
      this.movieShowFinal =  this.movieShow.filter(x=> x.startTime.hours <24 && x.startTime.hours >= 18)
      return;
    }
    else{
      this.movieShowFinal =  this.movieShow.filter(x=> x.startTime.hours <6 && x.startTime.hours >= 0)
      return;
    }
  }
}
