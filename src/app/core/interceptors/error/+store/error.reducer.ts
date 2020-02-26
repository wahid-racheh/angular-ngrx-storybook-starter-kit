import { Action, createReducer, on } from '@ngrx/store';

import * as errorActions from '@app/core/interceptors/error/+store/error.actions';

export interface ErrorState {
  code: number;
  message?: string;
  error?: any;
  showErrorPage: boolean;
}

export interface ErrorStore {
  readonly state: ErrorState;
}

export const errorInitialState: ErrorState = {
  code: -1,
  showErrorPage: false
};

const reducer = createReducer(
  errorInitialState,
  on(errorActions.resetState, errorActions.hideErrorPage, (state, _) => ({
    ...errorInitialState
  })),
  on(errorActions.showErrorPage, (state, _) => ({
    ...errorInitialState,
    showErrorPage: true
  })),
  on(
    errorActions.throw404Error,
    errorActions.throwUnauthorizedError,
    errorActions.throw500Error,
    errorActions.throwCustomError,
    (state, action) => ({
      ...errorInitialState,
      code: action.error.status,
      message: action.error.message,
      error: action.error
    })
  )
);

export function errorReducer(state: ErrorState | undefined, action: Action): ErrorState {
  return reducer(state, action);
}

export const errorStoreName = 'errorStore';
