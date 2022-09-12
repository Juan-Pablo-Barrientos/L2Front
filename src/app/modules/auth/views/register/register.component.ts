import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

//Services
import { DataService } from '@gdp/shared/services';
import { ToastrService } from 'ngx-toastr';

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
    usernameControl:new FormControl('',{validators: [Validators.required,Validators.minLength(8),Validators.maxLength(26)]}),
    nameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    surnameControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    passwordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    passwordConfirmControl:new FormControl('',[Validators.maxLength(50),Validators.required]),
    emailControl:new FormControl('',/*{validators:[Validators.required,Validators.maxLength(50)], asyncValidators: this.validateEmail.bind(this), updateOn: 'blur'}*/),
    phoneControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    dniControl:new FormControl('',[Validators.required,Validators.maxLength(10)]),
  },{validators: [this.checkPasswords]})
  }

  constructor(private dataService : DataService, private router:Router, private toastr:ToastrService) {
  }

  async onSubmit () {
    let request = {
      firstname : this.signUpForm.controls.nameControl.value,
      lastname : this.signUpForm.controls.surnameControl.value,
      username : this.signUpForm.controls.usernameControl.value,
      password : this.signUpForm.controls.passwordControl.value,
      email : this.signUpForm.controls.emailControl.value,
      dni : this.signUpForm.controls.dniControl.value,
      rol: 0,
      phoneNumber : this.signUpForm.controls.phoneControl.value,
    }
    this.dataService.addUser(request).subscribe(async (res:any) => {
      if (res.status==201){
        this.toastr.success('El registro fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.router.navigate(['/login']);
      }else{
        this.toastr.error('Fallo el registro', '🥺',{positionClass:'toast-bottom-right'});
      }
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

  onUsernameBlur(event:any){
      let request={username:event.target.value}
      const usernameField = this.signUpForm.controls['usernameControl'];
      this.dataService.userExists(request).subscribe((res:any) => {
              if(res) {
                usernameField.setErrors({'usernameExist': true});
                usernameField.markAsDirty();
            } else {
              usernameField.clearValidators();
              usernameField.markAsPristine();
            }
          }
      );
    }

    onEmailBlur(event:any){
      let request={email:event.target.value}
      const emailField = this.signUpForm.controls['emailControl'];
      this.dataService.emailExists(request).subscribe((res:any) => {
              if(res) {
                emailField.setErrors({'emailExist': true});
                emailField.markAsDirty();
            } else {
              emailField.clearValidators();
              emailField.markAsPristine();
            }
          }
      );
    }

  getFormControl() {
    return this.signUpForm;
}

}
