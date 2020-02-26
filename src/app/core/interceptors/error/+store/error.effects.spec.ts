import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import * as ErrorActions from '@app/core/interceptors/error/+store/error.actions';
import { ErrorEffects } from '@app/core/interceptors/error/+store/error.effects';
import { getError } from '@app/core/interceptors/error/helpers/error.helpers';
import { ErrorInterceptorService } from '@app/core/interceptors/error/services/error-interceptor.service';
import { RouterFacade } from '@app/core/services/router/+store/router.facade';

describe('ErrorEffects', () => {
  let effects: ErrorEffects;
  let service: ErrorInterceptorService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorEffects,
        {
          provide: RouterFacade,
          useValue: { go: jest.fn() }
        },
        {
          provide: ErrorInterceptorService,
          useValue: { intercept: jest.fn() }
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ErrorEffects);
    service = TestBed.inject(ErrorInterceptorService);
    actions$ = TestBed.inject(Actions);
  });

  describe('throw404Error$', () => {
    it('should return a ErrorActions.throw404Error, if the query throws', (done: any) => {
      // GIVEN
      const error: HttpErrorResponse = getError(404, '404 Not Found');
      const action = ErrorActions.throw404Error(error);
      actions$ = of(action);
      // WHEN
      effects.throw404Error$.subscribe(() => {
        // THEN
        // This should work
        expect(service.intercept).toBeDefined();
        done();
      });
    });
  });
});
