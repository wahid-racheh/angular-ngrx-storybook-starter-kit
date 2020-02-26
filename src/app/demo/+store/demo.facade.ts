import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as DemoActions from '@app/demo/+store/demo.actions';
import { DemoStore } from '@app/demo/+store/demo.reducer';
import { demoQuery } from '@app/demo/+store/demo.selectors';

@Injectable()
export class DemoFacade {
  public state$ = this.store.select(demoQuery.getState);
  public pageTitle$ = this.store.select(demoQuery.getPageTitle);

  constructor(private store: Store<DemoStore>) {}

  public resetState() {
    this.store.dispatch(DemoActions.resetState());
  }

  public setPageTitle(title: string) {
    this.store.dispatch(DemoActions.setPageTitle({ title }));
  }
}
