import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, config, map, mapTo, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tokens } from '../models/tokens';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUserName: string|null;
  private loggedUserRole: number|null;
  private loggedUserId: number|null;
  private loggedUser:any|null;

  constructor(private http: HttpClient ,private router:Router) {}

  login(user: { username: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/users/login`, user)
      .pipe(tap((data)=>this.loggedUser=data.data),
        tap((data)=> !!data.data.jwt ?  this.doLoginUser(user.username, data.data.jwt) :throwError(() => new Error('test'))),
        map(()=>true),
        catchError(error => {
          return of(false);
        }));
  }

  restoreLoggedUser(){
    if(this.getDecodedAccessToken(this.getJwtToken()!).id_user){
      this.loggedUserId = this.getDecodedAccessToken(this.getJwtToken()!).id_user
      this.http.get<Response>(`${environment.apiUrl}/users/` + this.loggedUserId).subscribe( (response: any) => {
        this.loggedUser = response;
      })} else{
      this.logout();
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  logout() {
    this.doLogoutUser();
    if (this.router.url!== '/login') {this.router.navigate(['/home']);}
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  isLoggedInAdmin():boolean {
    if(this.loggedUser?.rol === 1){ return true}
    else {return false};
  }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/users/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  getLoggedUser() {
    return this.loggedUser;
  }

  private doLoginUser(username: string, jwt:string) {
    this.loggedUserName = username;
    this.storeJwtToken(jwt);
  }

  private doLogoutUser() {
    this.loggedUserName = null;
    this.loggedUserRole = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
