import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as I18nActions from '@app/core/services/i18n/+store/i18n.actions';
import { I18nService } from '@app/core/services/i18n/services/i18n.service';

@Injectable()
export class I18nEffects {
  constructor(private actions$: Actions, private i18nService: I18nService) {}

  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   */
  public setLanguage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(I18nActions.setLanguage),
        tap((action: any) => {
          this.i18nService.setLanguage(action.lang);
        })
      ),
    { dispatch: false }
  );
}
