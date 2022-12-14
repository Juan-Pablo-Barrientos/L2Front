import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faMarsDouble } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = environment.apiUrl;
  movies: any=[];
  constructor(private http: HttpClient) {}
  mostViewedMovies:any=[];

  userExists(request:any): Observable<Response> {
    return this.http.post<Response>(this.baseUrl + '/users/exist', request)
  }

  emailExists(request:any): Observable<Response> {
    return this.http.post<Response>(this.baseUrl + '/users/existemail', request)
  }

  getMovies(title: string,id_genre:number): Observable<Response> {
    let params = new HttpParams()
    params = params.append('title',title)
    params = params.append('id_genre',id_genre)
    return this.http.get<Response>(this.baseUrl + '/movies', { params: params });
  }

  addUser(request: any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/users/register', request,{ observe: 'response' });
  }
  addDirector(request: any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/directors', request,{ observe: 'response' });
  }
  addGenre(request: any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/genres', request,{ observe: 'response' });
  }
  addShow(request: any): Observable<HttpResponse<ArrayBuffer>>  {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/shows', request,{ observe: 'response' });
  }

  getMovieRating(movieName:string,movieYear:string): Observable<ArrayBuffer> {
    return this.http.get<ArrayBuffer>('https://api.themoviedb.org/3/search/movie?api_key=01f3e1865cc273a0b649f1fb6e3b8799&language=es-ES&query='+movieName+'&include_adult=false&year='+movieYear);
  }

  buyTicket(request: any): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/tickets', request,{ observe: 'response' });
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

  editUserPassword(request: any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/users/changepassword', request);
  }

  editUser(request: any,idUser:number): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + '/users/'+idUser, request);
  }
  editDirector(request: any,idDirector:number): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + '/directors/'+idDirector, request);
  }
  editGenre(request: any,idGenre:number): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(this.baseUrl + '/genres/'+idGenre, request);
  }

  addContactPost(request: any): Observable<ArrayBuffer> {
    return this.http.post<ArrayBuffer>(this.baseUrl + '/contact', request);
  }

  getShows(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/shows/');
  }

  getTheaters(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/theater');
  }
  getContacts(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/contact');
  }

  getUsers(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/users');
  }
  getShowsByDayAndTheaters(request:any): Observable<Response> {
    return this.http.post<Response>(this.baseUrl + '/shows/showsdate',request);
  }
  getMovie(idMovie: number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl+'/movies/'+idMovie)
  }
  getGenres(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/genres');
  }
  getDirectors(): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/directors');
  }
  getTicketsByDni(dniUser:string): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/tickets/user/'+dniUser);
  }
  getUser(idUser:number): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + '/users/'+idUser);
  }

  delUser(idUser:number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + '/users/'+idUser);
  }
  delDirector(idDirector:number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + '/directors/'+idDirector);
  }
  delGenre(idGenre:number): Observable<HttpResponse<Response>> {
    return this.http.delete<Response>(this.baseUrl + '/genres/'+idGenre,{ observe: 'response' });
  }
  delMovie(idMovie:number): Observable<Response> {
    return this.http.delete<Response>(this.baseUrl + '/movies/'+idMovie);
  }
}
