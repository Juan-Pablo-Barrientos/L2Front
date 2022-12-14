import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

//Componentes
import { AboutusComponent, ContactusComponent, FrequentQuestionsComponent, HomeComponent, MovieDetailComponent } from '@gdp/dashboard/views';
import { TicketsListComponent } from './views/tickets-list/tickets-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PresentationComponent } from './views/presentation/presentation.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    FrequentQuestionsComponent,
    MovieDetailComponent,
    TicketsListComponent,
    PresentationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NgbModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports:[
    HomeComponent,
    ContactusComponent,
    AboutusComponent,
    FrequentQuestionsComponent
  ]
})
export class DashboardModule { }
