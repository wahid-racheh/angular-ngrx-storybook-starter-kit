import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as I18nActions from '@app/core/services/i18n/+store/i18n.actions';
import { I18nStore } from '@app/core/services/i18n/+store/i18n.reducer';
import { i18nQuery } from '@app/core/services/i18n/+store/i18n.selectors';

@Injectable({
  providedIn: 'root'
})
export class I18nFacade {
  public state$ = this.store.select(i18nQuery.getState);
  public currentLang$ = this.store.select(i18nQuery.getCurrentLanguage);

  constructor(private store: Store<I18nStore>) {}

  public setLanguage(lang: string) {
    this.store.dispatch(I18nActions.setLanguage({ lang }));
  }
}
