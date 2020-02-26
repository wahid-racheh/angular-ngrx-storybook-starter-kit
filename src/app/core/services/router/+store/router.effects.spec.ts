import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';

import * as RouterActions from '@app/core/services/router/+store/router.actions';
import { RouterEffects } from '@app/core/services/router/+store/router.effects';
import { RouterStateParams } from '@app/core/services/router/interfaces/types.interface';

describe('RouterEffects', () => {
  let effects: RouterEffects;
  let routerService: Router;
  let locationService: Location;
  let actions$: Observable<any>;

  let forwardSpy: any;
  let backSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        RouterEffects,
        provideMockActions(() => actions$),
        {
          provide: Location,
          useClass: SpyLocation
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        }
      ]
    });
  });

  beforeEach(() => {
    effects = TestBed.get(RouterEffects);
    routerService = TestBed.get(Router);
    locationService = TestBed.get(Location);
    actions$ = TestBed.get(Actions);

    forwardSpy = spyOn(locationService, 'forward');
    backSpy = spyOn(locationService, 'back');
  });

  describe('RouterEffects', () => {
    it('should work', async () => {
      actions$ = hot('-a-|', { a: { type: 'LOAD_DATA' } });
      expect(true).toBeTruthy();
    });

    it('should dispatch a go action', (done: any) => {
      // GIVEN
      const params: RouterStateParams = { path: ['/'] };
      const action = RouterActions.go({ params });
      actions$ = of(action);
      // WHEN
      effects.go$.subscribe(() => {
        // THEN
        expect(routerService.navigate).toHaveBeenCalled();
        done();
      });
    });

    it('should dispatch a back action', (done: any) => {
      // GIVEN
      const action = RouterActions.back();
      actions$ = of(action);
      // WHEN
      effects.back$.subscribe(() => {
        // THEN
        expect(backSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should dispatch a forward action', (done: any) => {
      // GIVEN
      const action = RouterActions.forward();
      actions$ = of(action);
      // WHEN
      effects.forward$.subscribe(() => {
        // THEN
        expect(forwardSpy).toHaveBeenCalled();
        done();
      });
    });
  });
});
