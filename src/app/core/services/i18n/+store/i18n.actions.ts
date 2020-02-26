import { createAction, props } from '@ngrx/store';

export const setLanguage = createAction('[i18n] Set Language', props<{ lang: string }>());
