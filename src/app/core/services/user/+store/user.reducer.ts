import { Action, createReducer, on } from '@ngrx/store';

import * as UserActions from '@app/core/services/user/+store/user.actions';
import { User } from '@app/core/services/user/models/user.interface';

export interface UserState {
  user: User;
  currentUser: User;
  searchResult: User[];
  isLoading: boolean;
}

export interface UserStore {
  readonly state: UserState;
}

export const userInitialState: UserState = {
  user: null,
  currentUser: null,
  searchResult: [],
  isLoading: false
};

const reducer = createReducer(
  userInitialState,
  on(UserActions.resetState, (state, _) => ({
    ...userInitialState
  })),
  on(UserActions.getUser, UserActions.search, (state, _) => ({
    ...state,
    isLoading: true
  })),
  on(UserActions.getUserSuccess, (state, action) => ({
    ...state,
    user: action.response,
    isLoading: false
  })),
  on(UserActions.searchSuccess, (state, action) => ({
    ...state,
    searchResult: action.response,
    isLoading: false
  })),
  on(UserActions.getUserFail, UserActions.searchFail, (state, _) => ({
    ...state,
    isLoading: false
  }))
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
  return reducer(state, action);
}

export const userStoreName = 'userStore';
