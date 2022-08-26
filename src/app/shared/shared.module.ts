import { NgModule, ɵnoSideEffects } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Componentes
import { FooterComponent, NavbarComponent } from '@gdp/shared/views'



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[FooterComponent,NavbarComponent]
})
export class SharedModule { }
