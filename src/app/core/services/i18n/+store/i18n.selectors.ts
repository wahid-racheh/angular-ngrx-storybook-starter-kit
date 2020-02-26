import { createFeatureSelector, createSelector } from '@ngrx/store';

import { I18nState, i18nStoreName } from '@app/core/services/i18n/+store/i18n.reducer';

export const getState = createFeatureSelector<I18nState>(i18nStoreName);

export const getCurrentLanguage = createSelector(getState, (state: I18nState) => state.lang);

export const i18nQuery = {
  getState,
  getCurrentLanguage
};
