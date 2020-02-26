import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as UserActions from '@app/core/services/user/+store/user.actions';
import { UserFacade } from '@app/core/services/user/+store/user.facade';
import { UserStore } from '@app/core/services/user/+store/user.reducer';

describe('UserFacade', () => {
  let store: MockStore<UserStore>;
  let facade: UserFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserFacade, provideMockStore()]
    });
    store = TestBed.get(Store);
    facade = TestBed.get(UserFacade);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch a UserActions.resetState action when resetState is called', () => {
    // GIVEN
    const action = UserActions.resetState();
    // WHEN
    facade.resetState();
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a UserActions.getUser action when getUser is called', () => {
    // GIVEN
    const id: string = 'id';
    const action = UserActions.getUser({ id });
    // WHEN
    facade.getUser(id);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a UserActions.search action when search is called with the name', () => {
    // GIVEN
    const name: string = 'test';
    const action = UserActions.search({ name });
    // WHEN
    facade.search(name);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
