import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent, MovieListComponent, RegisterComponent, UserListComponent, UserPanelComponent } from '@gdp/auth/views';
import { HomeComponent,FrequentQuestionsComponent,ContactusComponent,AboutusComponent, MovieDetailComponent } from '@gdp/dashboard/views';

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
    path:'userList',
    component:UserListComponent
  },
  {
    path:'movieList',
    component:MovieListComponent
  },
  {
    path: 'movieDetails/:id',
    component: MovieDetailComponent
  },
  {
    path: 'userPanel',
    component: UserPanelComponent
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
