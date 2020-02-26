import { createAction, props } from '@ngrx/store';

export const resetState = createAction('[Demo] Reset State');

export const setPageTitle = createAction('[Demo] Set Page Title', props<{ title: string }>());

export const search = createAction('[Demo] search', props<{ query: string }>());

export const searchComplete = createAction('[Demo] search complete', props<{ data: any[] }>());
