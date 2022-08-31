import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canLoad()
  {
    if (this.authService.isLoggedIn()) {
      return true
    }
    return !this.authService.isLoggedIn();
  }
}
