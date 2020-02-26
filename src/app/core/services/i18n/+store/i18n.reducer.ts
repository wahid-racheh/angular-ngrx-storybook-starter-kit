import { Action, createReducer, on } from '@ngrx/store';

import * as I18nActions from '@app/core/services/i18n/+store/i18n.actions';

export interface I18nState {
  lang: string;
}

export interface I18nStore {
  readonly state: I18nState;
}

export const i18nInitialState: I18nState = {
  lang: 'fr'
};

const reducer = createReducer(
  i18nInitialState,
  on(I18nActions.setLanguage, (state, action) => ({
    ...state,
    lang: action.lang
  }))
);

export function i18nReducer(state: I18nState | undefined, action: Action): I18nState {
  return reducer(state, action);
}

export const i18nStoreName = 'i18nStore';
