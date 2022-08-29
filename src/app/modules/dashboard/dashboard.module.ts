import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Componentes
import { AboutusComponent, ContactusComponent, FrequentQuestionsComponent, HomeComponent } from '@gdp/dashboard/views';
import { MovieDetailComponent } from './views/movie-detail/movie-detail.component';
import { RouterModule } from '@angular/router';



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
