import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Componentes
import { LoginComponent, MovieListComponent, RegisterComponent, UserListComponent, ContactUsListComponent } from '@gdp/auth/views';
//Guards
import { AuthGuard, AdminGuard } from '@gdp/auth/guards';
//Services
import { AuthService } from '@gdp/auth/services';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    MovieListComponent,
    ContactUsListComponent
  ],
  providers:[
    AuthGuard,
    AuthService,
    AdminGuard
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
