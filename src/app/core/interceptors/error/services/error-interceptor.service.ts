import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { handleError } from '@app/core/helpers/api-helpers';
import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';

@Injectable()
export class ErrorInterceptorService {
  constructor(private facade: ErrorFacade) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.facade.resetState();
    return next.handle(request).pipe(
      // tap((event: HttpEvent<any>) => {
      //   if (event instanceof HttpResponse) {
      //     // Here we can do anything with the reponse
      //   }
      // }),
      catchError((error, caught) => {
        const err: any = handleError(error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.status === 403) {
            this.facade.throwUnauthorizedError(err);
          } else if (error.status >= 500) {
            this.facade.throw500Error(err);
          }
        }
        return throwError(err);
      })
    );
  }
}
