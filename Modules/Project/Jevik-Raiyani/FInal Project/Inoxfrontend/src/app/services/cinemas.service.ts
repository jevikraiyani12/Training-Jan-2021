import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HostUrl } from './HostUrl';
import { ICinemas } from './ICinema';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {
private  apiServer = HostUrl + '/api/cinemas'
  
  //private apiServer = "http://20.198.103.48:1019/api/cinemas";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

   getAll(): Observable<ICinemas[]> {
    return this.httpClient.get<ICinemas[]>(this.apiServer)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  // getById(id): Observable<IMovies> {
  //   return this.httpClient.get<IMovies>(this.apiServer + '/' + id)
  //   .pipe(
  //     catchError(this.errorHandler)
  //   )
  // }


  create(cinema): Observable<ICinemas> {
    return this.httpClient.post<ICinemas>(this.apiServer , JSON.stringify(cinema), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
 

 
  update(id, cinema): Observable<ICinemas> {
    return this.httpClient.put<ICinemas>(this.apiServer + '/' + id, JSON.stringify(cinema), this.httpOptions)
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
