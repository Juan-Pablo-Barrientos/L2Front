import { Component, OnInit } from '@angular/core';
import { FormControl, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

//Services
import { AuthService } from '@gdp/auth/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faArrowRightToBracket = faArrowRightToBracket;
  loginForm: any;


  constructor(private router: Router,private authService: AuthService,private toastr:ToastrService ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
    usernameControl:new FormControl('',[Validators.required]),
    passwordControl:new FormControl('',[Validators.required]),
    })
  }

  onSubmit(){

    this.authService.logout();

    this.authService.login(
      {
        username: this.loginForm.controls.usernameControl.value,
        password: this.loginForm.controls.passwordControl.value
      }
    )
    .subscribe(success => {
      if (this.authService.isLoggedIn()) {
        this.toastr.success('Iniciado sesion con exito', 'Exito',{positionClass:'toast-bottom-right'})
        this.router.navigate(['/home']);
      }else{
        this.toastr.error('No se ha encontrado ese usuario y/o contraseña', ':(',{positionClass:'toast-bottom-full-width'})}
    });
  }

}
