import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import { IMovies } from 'src/app/services/IMovies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieFlag: number
  registerForm: FormGroup;
  submitted = false;
  TotalMovie: IMovies[] = []
  PutMovieId: number
  UpdateFlag = false

  constructor(private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router:Router) { }

  ngOnInit(): void {
    this.movieFlag = parseInt(this.activateRoute.snapshot.paramMap.get('id'));

    this.registerForm = this.formBuilder.group({
      movieName: ['', [Validators.required, Validators.minLength(2)]],
      releaseDate: ['', Validators.required],
      language: ['', [Validators.required, Validators.minLength(3)]],
      rationg: ['0'],
      descripton: ['', Validators.minLength(15)],
      duration: ['', [Validators.required, Validators.minLength(2)]],
      movieImages: ['', [Validators.required, Validators.minLength(10)]],
      movieTrailer: ['', [Validators.required, Validators.minLength(10)]]
    });

    if (this.movieFlag == 0) {
      return
    }

    this.moviesService.getAll().subscribe(data => {
      this.TotalMovie = data
        .sort((a, b) => {
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        })

      //console.log(this.TotalMovie)
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if(this.UpdateFlag == true){
      return
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.moviesService.create(this.registerForm.value).subscribe(data => {
      alert('Movie added')
      this.router.navigate(['../admin']);
    },
      err => {
        alert(err)
      })
  }

  setValueToForm(data) {
    this.UpdateFlag = true
    this.movieFlag = 0
    this.PutMovieId = data.movieId
    this.registerForm.patchValue(data);
    this.registerForm.controls.releaseDate.setValue(formatDate(data.releaseDate, 'yyyy-MM-dd', 'en'));
  }
  UpdateMovie(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value.movieId = this.PutMovieId
    this.moviesService.update(this.PutMovieId,this.registerForm.value).subscribe(data=>{
      alert('Movie Updated')
      this.router.navigate(['../admin']);
    },
    err=>{
      alert(err)
    })
  }
}


