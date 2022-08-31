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
    return this.http.get<Response>(this.baseUrl + 'user/userExist/'+username)

  }

  addUser(request: any): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + 'user', request);
  }

  editUserPassword(request: any,idUser:number): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + 'user/'+idUser, request);
  }

  addContactPost(request: any): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + 'contact', request);
  }
}
