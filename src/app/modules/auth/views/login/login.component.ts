import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faArrowRightToBracket = faArrowRightToBracket;
  loginForm: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
    emailControl:new FormControl('',[Validators.required]),
    passwordControl:new FormControl('',[Validators.required]),
    rememberControl:new FormControl(false),
    })
  }

  onSubmit(){
    console.log("asd")
    this.router.navigateByUrl('/home')
  }

}
