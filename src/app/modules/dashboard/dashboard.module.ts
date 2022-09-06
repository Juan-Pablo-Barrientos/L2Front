import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

//Componentes
import { AboutusComponent, ContactusComponent, FrequentQuestionsComponent, HomeComponent, MovieDetailComponent } from '@gdp/dashboard/views';


@NgModule({
  declarations: [
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    FrequentQuestionsComponent,
    MovieDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NgbModule,
    RouterModule,
  ],
  exports:[
    HomeComponent,
    ContactusComponent,
    AboutusComponent,
    FrequentQuestionsComponent
  ]
})
export class DashboardModule { }
