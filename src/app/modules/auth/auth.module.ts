import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Componentes
import { LoginComponent, MovieListComponent, RegisterComponent, UserListComponent } from '@gdp/auth/views';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './service/auth.service';
import { AdminGuard } from './guards/admin.guard';
import { ContactUsListComponent } from './views/contact-us-list/contact-us-list.component';



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
