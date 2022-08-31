import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';


import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faArrowRightToBracket = faArrowRightToBracket;
  loginForm: any;


  constructor(private router: Router,private authService: AuthService, ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
    usernameControl:new FormControl('',[Validators.required]),
    passwordControl:new FormControl('',[Validators.required]),
    })
  }

  onSubmit(){

    this.authService.login(
      {
        username: this.loginForm.controls.usernameControl.value,
        password: this.loginForm.controls.passwordControl.value
      }
    )
    .subscribe(success => {
      if (success) {
        this.router.navigate(['/userList']);
      }
    });
  }

}
