import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemasService } from 'src/app/services/cinemas.service';
import { ICinemas } from 'src/app/services/ICinema';
import { ScreensService } from 'src/app/services/screens.service';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  TotalCinema: ICinemas[] = []
  AddCinemaId: number
  AddScreenId: number
  Flag = false

  constructor(private formBuilder: FormBuilder,
    private cinemasService: CinemasService,
    private router: Router,
    private screenService: ScreensService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      screenNo: ['', Validators.required],
      capacity: ['', Validators.required],

      rows: this.formBuilder.array([])
    });


    this.cinemasService.getAll().subscribe(data => {
      this.TotalCinema = data
        .sort((a, b) => {
          return b.cinemaId - a.cinemaId
        })

      //console.log(this.TotalCinema)
    })
  }
  rows(): FormArray {
    return this.f.rows as FormArray;
  }

  newRow(): FormGroup {
    return this.formBuilder.group({
      rawNo: ['', Validators.required],
      seats: this.formBuilder.array([])
    });
  }
  addRow() {
    this.rows().push(this.newRow());
  }
  removeRow(rowIndex: number) {
    this.rows().removeAt(rowIndex);
  }
  rowSeats(rowIndex: number): FormArray {
    return this.rows()
      .at(rowIndex)
      .get('seats') as FormArray;
  }
  newSeat(): FormGroup {
    return this.formBuilder.group({
      seatNo:  ['', Validators.required],
      seatTypeId:  ['', Validators.required]
    });
  }
  addRowSeat(rowIndex: number) {
    this.rowSeats(rowIndex).push(this.newSeat());
  }
  removeRowSeat(rowIndex: number, seatIndex: number) {
    this.rowSeats(rowIndex).removeAt(seatIndex);
  }
 

  get f() { return this.registerForm.controls; }

 
  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);

    // this.screenService.create({
    //   cinemaId : this.AddCinemaId,
    //   screenNo : this.f.screenNo.value,
    //   capacity : this.f.capacity.value
    // }).subscribe(data => {
    //   this.AddScreenId = data.screenId
    //   console.log(this.AddScreenId)
    //  // this.router.navigate(['../admin']);
    // },
    //   err => {
    //     alert(err)
    //   })
  }

  setValueToForm(data) {
    this.Flag = true
    this.AddCinemaId = data
    console.log(data)
    // this.PutCinemaId = data.cinemaId
    this.registerForm.patchValue(data);
  }

}


