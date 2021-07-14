import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemasService } from 'src/app/services/cinemas.service';
import { ICinemas } from 'src/app/services/ICinema';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {

  CinemaFlag: number
  registerForm: FormGroup;
  submitted = false;
  TotalCinema: ICinemas[] = []
  PutCinemaId: number
  UpdateFlag = false

  constructor(private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cinemasService: CinemasService,
    private router:Router) { }

  ngOnInit(): void {
    this.CinemaFlag = parseInt(this.activateRoute.snapshot.paramMap.get('id'));

    this.registerForm = this.formBuilder.group({
      cinemaName: ['', [Validators.required, Validators.minLength(3)]],
      cinemaAddress: ['', [Validators.required, Validators.minLength(3)]],
      cinemaPincode: ['', Validators.required],
      cinemaCity: ['', [Validators.required, Validators.minLength(3)]],
      cinemaContactNo: ['0'],
     });

    if (this.CinemaFlag == 0) {
      return
    }

    this.cinemasService.getAll().subscribe(data => {
      this.TotalCinema = data
        .sort((a, b) => {
          return b.cinemaId - a.cinemaId
        })

      //console.log(this.TotalCinema)
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

    this.cinemasService.create(this.registerForm.value).subscribe(data => {
      alert('Cinema added')
      this.router.navigate(['../admin']);
    },
      err => {
        alert(err)
      })
  }

  setValueToForm(data) {
    this.UpdateFlag = true
    this.CinemaFlag = 0
    this.PutCinemaId = data.cinemaId
    this.registerForm.patchValue(data);
    }
  UpdateCinema(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.value.cinemaId = this.PutCinemaId
    this.cinemasService.update(this.PutCinemaId,this.registerForm.value).subscribe(data=>{
      alert('Cinema Updated')
      this.router.navigate(['../admin']);
    },
    err=>{
      alert(err)
    })
  }
}


