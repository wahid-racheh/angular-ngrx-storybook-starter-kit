import { HttpErrorResponse } from '@angular/common/http';

import { handleError, handleSuccess } from '@app/core/helpers/api-helpers';

describe('ApiHelpers', () => {
  it('should extract body from response `handleSuccess`', () => {
    const data: any = handleSuccess({ body: 'this is test data' });
    expect(data).toBe('this is test data');
  });

  it('should handle error response `handleError`', () => {
    // GIVEN
    const mockedError = {
      error: 'Internal server error',
      status: 500,
      url: 'http://example.com'
    };

    // WHEN
    // THEN
    expect(() => {
      handleError(new HttpErrorResponse(mockedError));
    }).toThrowError(Error);

    // WHEN
    // THEN
    expect(() => {
      handleError({ message: 'This is an error' });
    }).toThrowError(Error);
  });
});
