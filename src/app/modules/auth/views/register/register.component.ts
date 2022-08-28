import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DataService } from '@gdp/shared/services';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signUpForm: any;
  usernameControl:any;

  ngOnInit(): void {

  this.signUpForm = new FormGroup({
    usernameControl:new FormControl('',{validators: [Validators.required,Validators.maxLength(50)],/* asyncValidators: this.validateUser.bind(this), updateOn: 'blur'*/}),
    nameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    surnameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    passwordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    passwordConfirmControl:new FormControl('',[Validators.maxLength(20),Validators.required]),
    emailControl:new FormControl('',[Validators.required,Validators.maxLength(50),Validators.email]),
    phoneControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    dniControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
  },{validators: [this.checkPasswords]})

  this.signUpForm.valueChanges.subscribe((value: any) => console.log(value))
  }

  constructor(private dataService : DataService) {
  }

  onSubmit() {
    let request = {
      name : this.signUpForm.controls.nameControl.value,
      surname : this.signUpForm.controls.surnameControl.value,
      username : this.signUpForm.controls.usernameControl.value,
      password : this.signUpForm.controls.passwordControl.value,
      email : this.signUpForm.controls.emailControl.value,
      dni : this.signUpForm.controls.dniControl.value,
      role: 'client',
      phoneNumber : this.signUpForm.controls.phoneControl.value,
    }
    this.dataService.addUser(request).subscribe(response => {
      console.log(response);
    });
  }
  reset() {
    this.signUpForm.reset();
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('passwordControl')?.value;
    let confirmPass = group.get('passwordConfirmControl')?.value
    return pass === confirmPass ? null : { 'notSame': true }
  }
/*
  validateUser(control: AbstractControl) {
    return this.dataService.userExists(control.value).pipe(
        map((res:any) => {console.log(res);
            return res.exist ? { 'usernameExists': true }:null ;
        })
    );
  }
*/
  getUserNameControl() {
    return this.signUpForm.controls['usernameControl'];
}

}
