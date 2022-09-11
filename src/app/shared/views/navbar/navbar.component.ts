import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from 'jwt-decode';
import { faPencil, faVideo } from '@fortawesome/free-solid-svg-icons';

//Services
import { AuthService } from '@gdp/auth/services';
import { DataService } from '@gdp/shared/services';
import { ToastrService } from 'ngx-toastr';

declare const initGoogleApi:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faPencil=faPencil
  faVideo=faVideo
  title: string = "";
  id_genre: any;
  passwordChangeForm:any

  constructor(private modalService: NgbModal, public authService:AuthService, public dataService:DataService , private router:Router, private toastr:ToastrService) { }

  search() {
    this.dataService.getMovies(this.title,this.id_genre??='').subscribe((response: any) => {
      this.dataService.movies = response;
      this.dataService.movies.search=1;
      this.router.navigate(['/home']);
    });
  }

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

  clearSearch(){
    this.dataService.getMovies(this.title='',this.id_genre??='').subscribe((response: any) => {
      this.dataService.movies = response;
    });
  }

  onSubmitPassword(){
    let request = {
      old : this.passwordChangeForm.controls.oldPasswordControl.value,
      new : this.passwordChangeForm.controls.newPasswordControl.value,
      id: this.authService.getDecodedAccessToken(this.authService.getJwtToken()!).id_user
    }
    this.passwordChangeForm.reset()
    this.dataService.editUserPassword(request).subscribe({
      error: (error: HttpErrorResponse) => {
        if (error.status==200){
          this.toastr.success('La contraseña ha sido cambiada', 'Exito',{positionClass:'toast-bottom-right'});
        }else if (error.status==400){
          this.toastr.error('La contraseña no coincide', ':(',{positionClass:'toast-bottom-right'});
        }}
    });
  }
}
