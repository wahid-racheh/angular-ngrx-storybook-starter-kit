import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const getError = (status: number, statusText: string): HttpErrorResponse => {
  return new HttpErrorResponse({
    status,
    statusText
  });
};

export const throwMockHttpError = (response: any): Observable<any> => {
  return of(response).pipe(
    map(error => error),
    tap((error: any) => {
      throw getError(error.status, error.message);
    })
  );
};
