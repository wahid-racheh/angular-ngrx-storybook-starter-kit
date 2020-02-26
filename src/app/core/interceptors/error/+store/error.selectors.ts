import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ErrorState, errorStoreName } from '@app/core/interceptors/error/+store/error.reducer';

export const getState = createFeatureSelector<ErrorState>(errorStoreName);
export const getCode = createSelector(getState, (state: ErrorState) => state.code);
export const showErrorPage = createSelector(getState, (state: ErrorState) => state.showErrorPage);
export const getMessage = createSelector(getState, (state: ErrorState) => state.message);
export const getError = createSelector(getState, (state: ErrorState) => state.error);

export const errorQuery = {
  getState,
  getCode,
  getMessage,
  getError,
  showErrorPage
};
