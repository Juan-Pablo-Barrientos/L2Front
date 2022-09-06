import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent, MovieListComponent, RegisterComponent, UserListComponent, ContactUsListComponent} from '@gdp/auth/views';
import { HomeComponent,FrequentQuestionsComponent,ContactusComponent,AboutusComponent, MovieDetailComponent } from '@gdp/dashboard/views';
//Guards
import { AdminGuard } from '@gdp/auth/guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'CinemaLand'
  },
  {
    path:'home',
    component: HomeComponent,
    title: 'CinemaLand'
  },
  {
    path:'login',
    component:LoginComponent,
    title: 'Login'
  },
  {
    path:'register',
    component:RegisterComponent,
    title: 'Registro'
  },
  {
    path:'aboutUs',
    component:AboutusComponent,
    title: 'Sobre nosotros'
  },
  {
    path:'contactUs',
    component:ContactusComponent,
    title: 'Contacto'
  },
  {
    path:'frequentQuestions',
    component:FrequentQuestionsComponent,
    title: 'preguntasFrecuentes'
  },
  {
    path:'userList',
    component:UserListComponent,
    canActivate:[AdminGuard],
    canLoad:[AdminGuard],
    title: 'Lista de usuarios'
  },
  {
    path:'contactUsList',
    component:ContactUsListComponent,
    canActivate:[AdminGuard],
    canLoad:[AdminGuard],
    title: 'Lista de contactos'
  },
  {
    path:'movieList',
    component:MovieListComponent,
    canActivate:[AdminGuard],
    canLoad:[AdminGuard],
    title: 'Lista de peliculas'
  },
  {
    path: 'movieDetails/:id',
    component: MovieDetailComponent,
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'CinemaLand'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
