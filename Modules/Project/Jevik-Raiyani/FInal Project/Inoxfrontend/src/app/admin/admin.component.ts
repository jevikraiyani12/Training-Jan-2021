import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  AdminFlag
  checkFlag : number = 1
  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.auth.GmailVerificationAdmin(localStorage.getItem('userGmail')).subscribe(data => {
      if (data.status = 'Success') { 
        this.AdminFlag = true
       // console.log(this.AdminFlag)
      }
    },
      err => {
        this.AdminFlag = false
        //console.log(this.AdminFlag)
        this.router.navigate(['/login'])
      })
  }
  changeCheckbox(val) {
    if (val == 1) {
      this.checkFlag = 1
    }
    else if(val == 2) {
      this.checkFlag = 2
    }
    else if(val == 3) {
      this.checkFlag = 3
    }
    else if(val == 4) {
      this.checkFlag = 4
    }
    else{
      this.checkFlag = 5
    }
    //console.log(this.checkFlag)
  }
  

}
