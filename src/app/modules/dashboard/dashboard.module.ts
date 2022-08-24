import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './about-us/aboutus.component';
import { ContactusComponent } from './contact-us/contactus.component';
import { AsocCompaniesComponent } from './asoc-companies/asoc-companies.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    AsocCompaniesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HomeComponent,
    ContactusComponent,
    AsocCompaniesComponent,
    AboutusComponent
  ]
})
export class DashboardModule { }
