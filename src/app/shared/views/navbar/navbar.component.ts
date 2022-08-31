import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'src/app/modules/auth/guards/auth.guard';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  passwordChangeForm:any

  constructor(private modalService: NgbModal, public authService:AuthService, public dataService:DataService , private router:Router) { }



  ngOnInit(): void {

    this.authService.isLoggedIn() ? this.authService.restoreLoggedUser() : null;


    this.passwordChangeForm = new FormGroup({
      oldPasswordControl:new FormControl('',{validators: [Validators.required,Validators.maxLength(50)]}),
      newPasswordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
      newConfirmPasswordControl:new FormControl('',[Validators.required,Validators.maxLength(50)]),
    },{validators: [this.checkPasswords]})
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('newPasswordControl')?.value;
    let confirmPass = group.get('newConfirmPasswordControl')?.value
    return pass === confirmPass ? null : { 'notSame': true }
  }

  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'userPanelModal'}).result
  }
  openPasswordChange(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'changePasswordModal'}).result
  }

  onSubmitPassword(){
    let request = {
      oldPassword : this.passwordChangeForm.controls.oldPasswordControl.value,
      newPassword : this.passwordChangeForm.controls.newPasswordControl.value,
    }

    this.dataService.editUserPassword(request, this.authService.getLoggedUser().id)

  }
}
