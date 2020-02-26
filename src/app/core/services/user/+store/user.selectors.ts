import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState, userStoreName } from '@app/core/services/user/+store/user.reducer';

export const getState = createFeatureSelector<UserState>(userStoreName);

export const getUser = createSelector(getState, (userState: UserState) => userState.user);

export const isLoading = createSelector(getState, (userState: UserState) => userState.isLoading);

export const getSearchResult = createSelector(
  getState,
  (userState: UserState) => userState.searchResult
);

export const userQuery = {
  getState,
  getUser,
  getSearchResult,
  isLoading
};
