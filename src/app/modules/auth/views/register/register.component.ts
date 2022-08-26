import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signUpForm=new FormGroup({
    usernameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    nameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    surnameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    passwordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    passwordConfirmControl:new FormControl('',[Validators.required,Validators.maxLength(20)]),
    emailControl:new FormControl('',[Validators.required,Validators.maxLength(50),Validators.email]),
    phoneControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    subscribeControl:new FormControl('')
  })

  constructor(){

    this.signUpForm.valueChanges.subscribe(value => console.log(value))

  }
  onSubmit(){

  }


  userExists(){

  }
  reset() {
    this.signUpForm.reset();
  }

}
