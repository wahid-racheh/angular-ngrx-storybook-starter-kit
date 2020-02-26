import { HttpErrorResponse } from '@angular/common/http';

import * as ErrorActions from '@app/core/interceptors/error/+store/error.actions';
import { getError } from '@app/core/interceptors/error/helpers/error.helpers';
import {
  errorInitialState as initialState,
  errorReducer as reducer
} from '@app/core/interceptors/error/+store/error.reducer';

describe('ErrorReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      // GIVEN
      // WHEN
      const result = reducer(undefined, {} as any);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('RESET_STATE', () => {
    it('should reset state to initial state', () => {
      // GIVEN
      const action = ErrorActions.resetState();
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('THROW_404_ERRORS', () => {
    it('should add code, message, error in state', () => {
      // GIVEN
      const error: HttpErrorResponse = getError(404, '404 Not Found');
      const action = ErrorActions.throw404Error({ error });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('THROW_UNAUTHORIZED_ERRORS', () => {
    it('should add code, message, error in state', () => {
      // GIVEN
      const error: HttpErrorResponse = getError(403, 'Unauthorized');
      const action = ErrorActions.throwUnauthorizedError({ error });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('THROW_500_ERRORS', () => {
    it('should add code, message, error in state', () => {
      // GIVEN
      const error: HttpErrorResponse = getError(500, 'Internal Server Error');
      const action = ErrorActions.throw500Error({ error });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('throwCustomError', () => {
    it('should add code, message, error in state', () => {
      // GIVEN
      const error = {
        status: 406,
        message: 'Error!',
        error: new Error('Error!')
      };
      const action = ErrorActions.throwCustomError({ error });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });
});
