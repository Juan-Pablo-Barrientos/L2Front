import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendContactForm(formContact:JSON) {
    return this.http.post(this.baseUrl+'contact',formContact)
    .pipe(catchError(error=>{return[]}))
    .subscribe()
  }



}
