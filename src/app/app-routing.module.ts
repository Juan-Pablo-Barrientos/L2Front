import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent, MovieListComponent, RegisterComponent, UserListComponent} from '@gdp/auth/views';
import { HomeComponent,FrequentQuestionsComponent,ContactusComponent,AboutusComponent, MovieDetailComponent } from '@gdp/dashboard/views';
import { AdminGuard } from './modules/auth/guards/admin.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';

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
    component:UserListComponent,
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
