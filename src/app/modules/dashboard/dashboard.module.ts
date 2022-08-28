import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Componentes
import { AboutusComponent, ContactusComponent, FrequentQuestionsComponent, HomeComponent } from '@gdp/dashboard/views';



@NgModule({
  declarations: [
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    FrequentQuestionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NgbModule
  ],
  exports:[
    HomeComponent,
    ContactusComponent,
    AboutusComponent,
    FrequentQuestionsComponent
  ]
})
export class DashboardModule { }
