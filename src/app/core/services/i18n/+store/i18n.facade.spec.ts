import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as I18nActions from '@app/core/services/i18n/+store/i18n.actions';
import { I18nFacade } from '@app/core/services/i18n/+store/i18n.facade';
import { I18nStore } from '@app/core/services/i18n/+store/i18n.reducer';

describe('I18nFacade', () => {
  let store: MockStore<I18nStore>;
  let facade: I18nFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [I18nFacade, provideMockStore()]
    });
    store = TestBed.inject(Store);
    facade = TestBed.inject(I18nFacade);
    spyOn(store, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should dispatch a I18nActions.setLanguage action when setLanguage is called', () => {
    // GIVEN
    const lang: string = 'fr';
    const action = I18nActions.setLanguage({ lang });
    // WHEN
    facade.setLanguage(lang);
    // THEN
    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
