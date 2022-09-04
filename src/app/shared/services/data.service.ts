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
  editMovie(request: any,idMovie:any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.put<ArrayBuffer>(this.baseUrl + '/movies/'+idMovie, request,{ observe: 'response' });
  }
  addImg(request: any): Observable<Response> {
    return this.http.put<Response>(this.baseUrl + '/movies/imgupload', request);
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
  getShowsByDayAndTheaters(request:any): Observable<Response> {
    return this.http.post<Response>(this.baseUrl + '/theaters',request);
  }
  getMovies(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/movies');
  }
  getMovie(idMovie: number): Observable<Response> {
    console.log(idMovie)
    return this.http.get<Response>(this.baseUrl+'/movies/'+idMovie)
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
