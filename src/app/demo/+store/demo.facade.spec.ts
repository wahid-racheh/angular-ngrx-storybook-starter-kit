import { TestBed } from '@angular/core/testing';

import * as DemoActions from '@app/demo/+store/demo.actions';
import { DemoFacade } from '@app/demo/+store/demo.facade';
import { DemoStore } from '@app/demo/+store/demo.reducer';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('DemoFacade', () => {
  let store: MockStore<DemoStore>;
  let facade: DemoFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoFacade, provideMockStore()]
    });
    store = TestBed.inject(Store);
    facade = TestBed.inject(DemoFacade);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch a DemoActions.resetState action when resetState is called', () => {
    // GIVEN
    const action = DemoActions.resetState();
    // WHEN
    facade.resetState();
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a DemoActions.setPageTitle action when setPageTitle is called', () => {
    // GIVEN
    const title: string = 'title';
    const action = DemoActions.setPageTitle({ title });
    // WHEN
    facade.setPageTitle(title);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
