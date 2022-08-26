import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent, RegisterComponent } from '@gdp/auth/views';
import { HomeComponent,FrequentQuestionsComponent,ContactusComponent,AboutusComponent } from '@gdp/dashboard/views';

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
    path:'frequentQuestions',
    component:FrequentQuestionsComponent
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
