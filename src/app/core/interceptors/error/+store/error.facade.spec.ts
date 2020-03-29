import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as ErrorActions from '@app/core/interceptors/error/+store/error.actions';
import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';
import { ErrorStore } from '@app/core/interceptors/error/+store/error.reducer';
import { getError } from '@app/core/interceptors/error/helpers/error.helpers';

describe('ErrorFacade', () => {
  let store: MockStore<ErrorStore>;
  let facade: ErrorFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorFacade, provideMockStore()]
    });
    // @ts-ignore
    store = TestBed.inject(Store);
    facade = TestBed.inject(ErrorFacade);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch a ErrorActions.resetState action when resetState is called', () => {
    // GIVEN
    const action = ErrorActions.resetState();
    // WHEN
    facade.resetState();
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a ErrorActions.throw404Error action when throw404Error is called', () => {
    // GIVEN
    const error: HttpErrorResponse = getError(404, '404 Not Found');
    const action = ErrorActions.throw404Error({ error });
    // WHEN
    facade.throw404Error(error);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a ErrorActions.throwUnauthorizedError action when throwUnauthorizedError is called', () => {
    // GIVEN
    const error: HttpErrorResponse = getError(403, 'Unauthorized');
    const action = ErrorActions.throwUnauthorizedError({ error });
    // WHEN
    facade.throwUnauthorizedError(error);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a ErrorActions.throw500Error action when throw500Error is called', () => {
    // GIVEN
    const error: HttpErrorResponse = getError(500, 'Internal Server Error');
    const action = ErrorActions.throw500Error({ error });
    // WHEN
    facade.throw500Error(error);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a ErrorActions.throwCustomError action when throwCustomError is called', () => {
    // GIVEN
    const error = {
      status: 406,
      code: '406',
      message: 'Error!'
    };
    const action = ErrorActions.throwCustomError({ error });
    // WHEN
    facade.throwCustomError(error);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
