import { Injectable } from '@angular/core';
import { BaseRouterStoreState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';

import * as RouterActions from '@app/core/services/router/+store/router.actions';
import { RouterStateParams } from '@app/core/services/router/interfaces/types.interface';

@Injectable({
  providedIn: 'root'
})
export class RouterFacade {
  constructor(private store: Store<BaseRouterStoreState>) {}

  public go(params: RouterStateParams) {
    this.store.dispatch(RouterActions.go({ params }));
  }

  public back() {
    this.store.dispatch(RouterActions.back());
  }

  public forward() {
    this.store.dispatch(RouterActions.forward());
  }
}
