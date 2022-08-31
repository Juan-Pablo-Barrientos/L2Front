import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot,CanActivate,CanLoad,Router,RouterStateSnapshot,} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedInAdmin()) {
      return true;
    }
    this.router.navigate(['/home']);
    alert('You are not allowed to view this page');
    return false;
  }

  canLoad() {
    if (this.authService.isLoggedInAdmin()) {
      console.log(this.authService.isLoggedInAdmin);
      return true;
    }
    return false;
  }
}
