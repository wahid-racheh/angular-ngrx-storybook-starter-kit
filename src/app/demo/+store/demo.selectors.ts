import { DemoState, demoStoreName } from '@app/demo/+store/demo.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getState = createFeatureSelector<DemoState>(demoStoreName);

export const getPageTitle = createSelector(getState, (demo: DemoState) => demo.pageTitle);

export const demoQuery = {
  getState,
  getPageTitle
};
