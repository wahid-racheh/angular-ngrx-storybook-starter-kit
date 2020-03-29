import { HttpErrorResponse } from '@angular/common/http';

import { getError, throwMockHttpError } from '@app/core/interceptors/error/helpers/error.helpers';

describe('ErrorHelpers', () => {
  it('`getError`, should get HttpErrorResponse error', () => {
    // GIVEN
    const status: number = 403;
    const statusText: string = 'Unauthorized';
    // WHEN
    const error: HttpErrorResponse = getError(status, statusText);
    // THEN
    expect(error).toBeDefined();
    expect(error instanceof HttpErrorResponse).toBeTruthy();
  });

  it('`throwMockHttpError`, should throw mock HttpError', () => {
    // GIVEN
    const status: number = 500;
    const statusText: string = 'Internal server error';
    const error: HttpErrorResponse = getError(status, statusText);
    // WHEN
    const result = throwMockHttpError(error);
    // THEN
    result.subscribe((e: any) => {
      expect(e).toBeDefined();
      expect(e instanceof HttpErrorResponse).toBeTruthy();
    });
  });
});
