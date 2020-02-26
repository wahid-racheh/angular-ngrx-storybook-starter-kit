import * as DemoActions from '@app/demo/+store/demo.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface DemoState {
  pageTitle: string;
  searchResult: any[];
}

export interface DemoStore {
  readonly state: DemoState;
}

export const demoInitialState: DemoState = {
  pageTitle: '',
  searchResult: []
};

const reducer = createReducer(
  demoInitialState,
  on(DemoActions.resetState, (state, _) => ({
    ...demoInitialState
  })),
  on(DemoActions.setPageTitle, (state, action) => ({
    ...state,
    pageTitle: action.title
  }))
);

export function demoReducer(state: DemoState | undefined, action: Action): DemoState {
  return reducer(state, action);
}

export const demoStoreName = 'demoStore';
