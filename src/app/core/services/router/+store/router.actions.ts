import { createAction, props } from '@ngrx/store';

import { RouterStateParams } from '@app/core/services/router/interfaces/types.interface';

export const go = createAction('[router] GO', props<{ params: RouterStateParams }>());

export const back = createAction('[router] BACK');

export const forward = createAction('[router] FORWARD');
