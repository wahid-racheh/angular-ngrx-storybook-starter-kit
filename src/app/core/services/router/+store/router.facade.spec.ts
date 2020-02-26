import { TestBed } from '@angular/core/testing';
import { BaseRouterStoreState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as RouterActions from '@app/core/services/router/+store/router.actions';
import { RouterFacade } from '@app/core/services/router/+store/router.facade';
import { RouterStateParams } from '@app/core/services/router/interfaces/types.interface';

describe('RouterFacade', () => {
  let store: MockStore<BaseRouterStoreState>;
  let facade: RouterFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouterFacade, provideMockStore()]
    });
    store = TestBed.get(Store);
    facade = TestBed.get(RouterFacade);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch a RouterActions.go action when go is called', () => {
    // GIVEN
    const params: RouterStateParams = { path: ['/'] };
    const action = RouterActions.go({ params });
    // WHEN
    facade.go(params);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a RouterActions.back action when back is called', () => {
    // GIVEN
    const action = RouterActions.back();
    // WHEN
    facade.back();
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a RouterActions.forward action when forward is called', () => {
    // GIVEN
    const action = RouterActions.forward();
    // WHEN
    facade.forward();
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
