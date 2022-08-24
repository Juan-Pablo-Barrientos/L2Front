import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, RegisterComponent } from './modules/auth/views';
import { AboutusComponent } from './modules/dashboard/about-us/aboutus.component';
import { AsocCompaniesComponent } from './modules/dashboard/asoc-companies/asoc-companies.component';
import { ContactusComponent } from './modules/dashboard/contact-us/contactus.component';
import { HomeComponent } from './modules/dashboard/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'aboutUs',
    component:AboutusComponent
  },
  {
    path:'contactUs',
    component:ContactusComponent
  },
  {
    path:'asocCompanies',
    component:AsocCompaniesComponent
  },
  {
    path: '**',
    component: HomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
