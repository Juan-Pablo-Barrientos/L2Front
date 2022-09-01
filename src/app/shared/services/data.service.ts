import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  userExists(username: string): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/users/userExist/'+username)

  }

  addUser(request: any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/users', request);
  }

  editUserPassword(request: any,idUser:number): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + '/users/'+idUser, request);
  }

  editUser(request: any,idUser:number): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + '/users/'+idUser, request);
  }

  addContactPost(request: any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/contact', request);
  }

  getUsers(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/users');
  }
  getUser(idUser:number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/users/'+idUser);
  }

  delUser(idUser:number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + '/users/'+idUser);
  }
}
