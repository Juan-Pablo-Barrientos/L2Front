import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Componentes
import { LoginComponent, MovieListComponent, RegisterComponent, UserListComponent } from '@gdp/auth/views';
import { UserPanelComponent } from './views/user-panel/user-panel.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    MovieListComponent,
    UserPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FontAwesomeModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { }
