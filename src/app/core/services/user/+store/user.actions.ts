import { createAction, props } from '@ngrx/store';

import { User } from '@app/core/services/user/models/user.interface';

export const resetState = createAction('[user] Reset State');

export const getUser = createAction('[user] GET_USER', props<{ id: string }>());
export const getUserSuccess = createAction('[user] GET_USER_SUCCESS', props<{ response: User }>());
export const getUserFail = createAction('[user] GET_USER_FAIL', props<{ error: any }>());

export const search = createAction('[user] SEARCH_USERS', props<{ name: string }>());
export const searchSuccess = createAction(
  '[user] SEARCH_USERS_SUCCESS',
  props<{ response: User[] }>()
);
export const searchFail = createAction('[user] SEARCH_USERS_FAIL', props<{ error: any }>());
