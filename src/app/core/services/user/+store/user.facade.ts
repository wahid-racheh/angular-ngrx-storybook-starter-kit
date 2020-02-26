import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as UserActions from '@app/core/services/user/+store/user.actions';
import { UserStore } from '@app/core/services/user/+store/user.reducer';
import { userQuery } from '@app/core/services/user/+store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  public state$ = this.store.select(userQuery.getState);
  public user$ = this.store.select(userQuery.getUser);
  public userList$ = this.store.select(userQuery.getSearchResult);
  public isLoading$ = this.store.select(userQuery.isLoading);

  constructor(private store: Store<UserStore>) {}

  public resetState() {
    this.store.dispatch(UserActions.resetState());
  }

  public getUser(id: string) {
    this.store.dispatch(UserActions.getUser({ id }));
  }

  public search(name: string) {
    this.store.dispatch(UserActions.search({ name }));
  }
}
