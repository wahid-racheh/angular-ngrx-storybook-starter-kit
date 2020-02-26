import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { handleError, handleSuccess } from '@app/core/helpers/api-helpers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get headers() {
    return new HttpHeaders().set('Authorization', '');
  }

  public get(url: string): Observable<any> {
    return this.http
      .get(`${environment.baseUrl}${url}`, { headers: this.headers, observe: 'response' })
      .pipe(
        map(res => handleSuccess(res)),
        catchError(res => handleError(res))
      );
  }

  public post(url: string, data: any): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}${url}`, JSON.stringify(data), {
        headers: this.headers.set('Content-Type', 'application/json'),
        observe: 'response'
      })
      .pipe(
        map(res => handleSuccess(res)),
        catchError(res => handleError(res))
      );
  }

  public put(url: string, data: any, extendOption?: any): Observable<any> {
    let options: any = {
      headers: this.headers.set('Content-Type', 'application/json'),
      observe: 'response'
    };

    if (extendOption) {
      options = Object.assign(options, extendOption);
    }

    return this.http.put(`${environment.baseUrl}${url}`, JSON.stringify(data), options).pipe(
      map(res => handleSuccess(res)),
      catchError(res => handleError(res))
    );
  }

  public delete(url: string): Observable<any> {
    return this.http
      .delete(`${environment.baseUrl}${url}`, { headers: this.headers, observe: 'response' })
      .pipe(
        map(res => handleSuccess(res)),
        catchError(res => handleError(res))
      );
  }
}
