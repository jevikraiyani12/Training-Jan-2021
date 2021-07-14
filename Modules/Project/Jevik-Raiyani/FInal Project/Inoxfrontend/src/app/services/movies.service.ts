import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IMovies } from './IMovies';
import { HostUrl } from './HostUrl';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  private apiServer = HostUrl + '/api/movies'
  //private apiServer = "http://20.198.103.48:1019/api/movies";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

   getAll(): Observable<IMovies[]> {
    return this.httpClient.get<IMovies[]>(this.apiServer)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  getById(id): Observable<IMovies> {
    return this.httpClient.get<IMovies>(this.apiServer + '/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  create(movie): Observable<IMovies> {
    return this.httpClient.post<IMovies>(this.apiServer, JSON.stringify(movie), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
 

 
  update(id, movie): Observable<IMovies> {
    return this.httpClient.put<IMovies>(this.apiServer + '/' + id, JSON.stringify(movie), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  // delete(id){
  //   return this.httpClient.delete<Product>(this.apiServer + '/products/' + id, this.httpOptions)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }
  errorHandler(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
}
