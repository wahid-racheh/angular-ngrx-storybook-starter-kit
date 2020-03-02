import { NgModule } from '@angular/core';
import {
  errorInitialState,
  errorReducer,
  errorStoreName
} from '@app/core/interceptors/error/+store/error.reducer';
import {
  i18nInitialState,
  i18nReducer,
  i18nStoreName
} from '@app/core/services/i18n/+store/i18n.reducer';
import { routerStoreName } from '@app/core/services/router/constants/router.constants';
import {
  userInitialState,
  userReducer,
  userStoreName
} from '@app/core/services/user/+store/user.reducer';
import { demoInitialState, demoReducer, demoStoreName } from '@app/demo/+store/demo.reducer';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';

export interface State {
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer
};

export function mockReducer(actionReducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    return actionReducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<any>> = !environment.production ? [mockReducer] : [];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(errorStoreName, errorReducer, { initialState: errorInitialState }),
    StoreModule.forFeature(i18nStoreName, i18nReducer, { initialState: i18nInitialState }),
    StoreModule.forFeature(userStoreName, userReducer, { initialState: userInitialState }),
    StoreModule.forFeature(demoStoreName, demoReducer, {
      initialState: demoInitialState
    }),
    StoreModule.forFeature(routerStoreName, routerReducer),
    EffectsModule.forRoot([])
  ],
  exports: [StoreModule, EffectsModule]
})
export class StoreMockModule {}
