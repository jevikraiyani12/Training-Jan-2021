import { Component, OnInit} from '@angular/core';
import { IMovies } from '../services/IMovies';
import { MoviesService } from '../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  LocalMovies :IMovies[] = [];
    
  
  constructor(private moiveService:MoviesService,
              private router:Router,
              private route: ActivatedRoute)  { }

  ngOnInit(): void { 
    this.moiveService.getAll().subscribe(data=>{
     this.LocalMovies = data
     .sort((a, b) => {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()}).slice(0,8) ;
      //console.log(this.LocalMovies);
    }) 
  } 
 
}
