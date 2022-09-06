import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Title } from '@angular/platform-browser';

//Componentes
import { LoginComponent, MovieListComponent, RegisterComponent, UserListComponent} from '@gdp/auth/views';
import { HomeComponent,FrequentQuestionsComponent,ContactusComponent,AboutusComponent, MovieDetailComponent } from '@gdp/dashboard/views';
import { AdminGuard } from './modules/auth/guards/admin.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ContactUsListComponent } from './modules/auth/views/contact-us-list/contact-us-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'CinemaLand'
  },
  {
    path:'home',
    component: HomeComponent,
    title: 'Home'
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
    component:UserListComponent,
    canActivate:[AdminGuard],
    canLoad:[AdminGuard]
  },
  {
    path:'contactUsList',
    component:ContactUsListComponent,
    canActivate:[AdminGuard],
    canLoad:[AdminGuard]
  },
  {
    path:'movieList',
    component:MovieListComponent,
    canActivate:[AdminGuard],
    canLoad:[AdminGuard]
  },
  {
    path: 'movieDetails/:id',
    component: MovieDetailComponent
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
