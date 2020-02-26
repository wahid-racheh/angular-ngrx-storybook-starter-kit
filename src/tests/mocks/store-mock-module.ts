import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { DemoFacade } from '@app/demo/+store/demo.facade';
import { UserFacade } from '@app/core/services/user/+store/user.facade';
import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';

import * as userMock from '@assets/mocks/user.mock.json';

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
  imports: [StoreModule.forRoot(reducers, { metaReducers }), EffectsModule.forRoot([])],
  providers: [
    provideMockStore(),
    {
      provide: ErrorFacade,
      useValue: {
        error$: of(new Error('Error!'))
      }
    },
    {
      provide: UserFacade,
      useValue: {
        user$: of(userMock.getById.successResponse),
        isLoading$: of(false),
        userList$: of(userMock.search.successResponse),
        getUser: of(),
        search: of()
      }
    },
    {
      provide: DemoFacade,
      useValue: {
        pageTitle$: of('My Demo App'),
        setPageTitle: of()
      }
    }
  ],
  exports: [StoreModule, EffectsModule]
})
export class StoreMockModule {}
