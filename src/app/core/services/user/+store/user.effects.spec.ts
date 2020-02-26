import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as UserActions from '@app/core/services/user/+store/user.actions';
import { UserEffects } from '@app/core/services/user/+store/user.effects';
import { UserService } from '@app/core/services/user/services/user.service';
import * as userMock from '@assets/mocks/user.mock.json';

describe('UserEffects', () => {
  let effects: UserEffects;
  let service: UserService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        {
          provide: UserService,
          useValue: {
            getById: jest.fn(),
            search: jest.fn()
          }
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UserEffects);
    service = TestBed.inject(UserService);
    actions$ = TestBed.inject(Actions);
  });

  describe('getUser$', () => {
    it('should return a UserActions.getUserSuccess, with the user, on success', () => {
      // GIVEN
      const action = UserActions.getUser({ id: 'id' });
      const completion = UserActions.getUserSuccess({
        response: userMock.getById.successResponse
      });
      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: userMock.getById.successResponse });
      const expected = cold('--c', { c: completion });
      // WHEN
      service.getById = jest.fn(() => response);
      // THEN
      expect(effects.getUser$).toBeObservable(expected);
    });

    it('should return a UserActions.getUserFail, if the query throws', () => {
      // GIVEN
      const action = UserActions.getUser({ id: 'id' });
      const error = new Error('Error!');
      const completion = UserActions.getUserFail({ error });
      // Remove error object to get the same expected result
      delete completion['error'];
      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      // WHEN
      service.getById = jest.fn(() => response);
      // THEN
      expect(effects.getUser$).toBeObservable(expected);
    });
  });

  describe('search$', () => {
    it(`should not do anything if search name is empty`, () => {
      const action = UserActions.search({ name: null });

      actions$ = hot('-a---', { a: action });
      const expected = cold('---');

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler()
        })
      ).toBeObservable(expected);
    });

    it('should return a UserActions.searchSuccess, with data', () => {
      // GIVEN
      const action = UserActions.search({ name: 'test' });
      const completion = UserActions.searchSuccess({
        response: userMock.search.successResponse
      });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: userMock.search.successResponse });
      const expected = cold('-----b', { b: completion });
      // WHEN
      service.search = jest.fn(() => response);
      // THEN
      expect(
        effects.search$({
          debounce: 400,
          scheduler: getTestScheduler()
        })
      ).toBeDefined();
      expected.subscribe((value: any) => {
        expect(value).toEqual(userMock.search.successResponse);
      });
    });

    it('should return a UserActions.searchFail, with data', () => {
      // GIVEN
      const action = UserActions.search({ name: 'test' });
      const error = new Error('Error!');
      const completion = UserActions.searchFail({ error });
      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      // WHEN
      service.search = jest.fn(() => response);
      // THEN
      expect(
        effects.search$({
          debounce: 400,
          scheduler: getTestScheduler()
        })
      ).toBeDefined();
      expected.subscribe((value: any) => {
        expect(value).toEqual(error);
      });
    });
  });
});
