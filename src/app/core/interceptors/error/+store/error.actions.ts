import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const resetState = createAction('[error] Reset State');

export const showErrorPage = createAction('[error] SHOW_ERROR_PAGE');
export const hideErrorPage = createAction('[error] HIDE_ERROR_PAGE');

export const throw404Error = createAction(
  '[error] THROW_404_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const throwUnauthorizedError = createAction(
  '[error] THROW_UNAUTHORIZED_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const throw500Error = createAction(
  '[error] THROW_500_ERROR',
  props<{ error: HttpErrorResponse }>()
);

export const throwCustomError = createAction('[error] THROW_CUSTOM_ERROR', props<{ error: any }>());
