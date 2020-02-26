import { HttpErrorResponse } from '@angular/common/http';

export const handleSuccess = (res: any): object => {
  return res.body || {};
};

export const handleError = (error: HttpErrorResponse | any): Promise<any> => {
  let errorMessage: string;
  if (error instanceof HttpErrorResponse) {
    const err = error.message || JSON.stringify(error);
    errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    throw new Error(errorMessage);
  } else {
    errorMessage = error.message ? error.message : error.toString();
    throw new Error(errorMessage);
  }
};
