import { HttpClient, HttpResponse } from '@angular/common/http';
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
    return this.http.post<ArrayBuffer>(this.baseUrl + '/users/register', request);
  }


  addMovie(request: any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/movies', request,{ observe: 'response' });
  }

  addContact(request: any ): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/contact', request,{ observe: 'response' });
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
  getMovies(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/movies');
  }
  getGenres(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/genres');
  }
  getDirectors(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/directors');
  }
  getUser(idUser:number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/users/'+idUser);
  }

  delUser(idUser:number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + '/users/'+idUser);
  }
  delMovie(idMovie:number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + '/movies/'+idMovie);
  }
}
