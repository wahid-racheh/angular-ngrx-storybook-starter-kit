import { environment } from '@env/environment';
import { ActionReducer, MetaReducer } from '@ngrx/store';

function logger(actionReducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any): any => {
    // tslint:disable-next-line:no-console
    console.log('state', state);
    // tslint:disable-next-line:no-console
    console.log('action', action);
    return actionReducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<any>> = !environment.production ? [logger] : [];
