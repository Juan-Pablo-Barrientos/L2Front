import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';


import { AuthService } from '../service/auth.service';
import { DataService } from '@gdp/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  User:any;
  rolUser:any;
  flag:boolean

  constructor(private authService: AuthService, private router: Router, private dataService:DataService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.User=this.authService.getDecodedAccessToken(this.authService.getJwtToken()!)) {
    return this.dataService.getUser(this.User.id_user).pipe(
      map((data:any)=> {if(data.rol===1) {
        return true
      }else{
        return this.router.parseUrl('/home');
      }}))
    }else{
        return this.router.parseUrl('/home');
      }
}

  canLoad() {
    if (this.authService.getLoggedUser().rol===1) {
      return true;
    }
    return false;
  }
}
