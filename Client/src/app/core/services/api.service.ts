import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) {}

  private static handleErrors(error: HttpErrorResponse) {
    return throwError(error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get<any> (`${environment.api_url}${path}`, {params})
      .pipe(catchError(error => ApiService.handleErrors(error)));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.httpClient.post<any> (`${environment.api_url}${path}`, body)
      .pipe(catchError(error => ApiService.handleErrors(error)));
  }

  patch(path: string, body: object): Observable<any> {
    return this.httpClient.patch<any> (`${environment.api_url}${path}`, body)
      .pipe(catchError(error => ApiService.handleErrors(error)));
  }

  delete(path: string): Observable<any> {
    return this.httpClient.delete<any> (`${environment.api_url}${path}`)
      .pipe(catchError(error => ApiService.handleErrors(error)));
  }

}
