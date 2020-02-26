import * as UserActions from '@app/core/services/user/+store/user.actions';
import {
  userInitialState as initialState,
  userReducer as reducer
} from '@app/core/services/user/+store/user.reducer';
import { User } from '@app/core/services/user/models/user.interface';
import * as userMock from '@assets/mocks/user.mock.json';

describe('UserReducer', () => {
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
      const action = UserActions.resetState();
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('GET_USER', () => {
    it('`GET_USER`, should set isLoading to true in state', () => {
      // GIVEN
      const id: string = 'id';
      const action = UserActions.getUser({ id });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });

    it('`GET_USER_SUCCESS`, should add a user, set isLoading to false in state', () => {
      // GIVEN
      const user: User = Object.assign({}, userMock.getById.successResponse);
      const action = UserActions.getUserSuccess({ response: user });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });

    it('`GET_USER_FAIL`, should set isLoading to false in state', () => {
      // GIVEN
      const error: Error = new Error('Error!');
      const action = UserActions.getUserFail({ error });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });

  describe('SEARCH_USER', () => {
    it('`SEARCH`, should set isLoading to true in state', () => {
      // GIVEN
      const name: string = 'test';
      const action = UserActions.search({ name });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });

    it('`SEARCH_SUCCESS`, should update searchResult, set isLoading to false in state', () => {
      // GIVEN
      const action = UserActions.searchSuccess({ response: userMock.search.successResponse });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });

    it('`SEARCH_FAIL`, should set isLoading to false in state', () => {
      // GIVEN
      const error: Error = new Error('Error!');
      const action = UserActions.searchFail({ error });
      // WHEN
      const result = reducer(initialState, action);
      // THEN
      expect(result).toMatchSnapshot();
    });
  });
});
