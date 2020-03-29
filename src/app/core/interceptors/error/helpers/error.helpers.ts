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
      const result: any = getError(error.status, error.message);
      result.status = error.status;
      result.code = error.code;
      result.message = error.message;
      result.error = error;
      throw result;
    })
  );
};
