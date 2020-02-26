import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import * as ErrorActions from '@app/core/interceptors/error/+store/error.actions';
import { RouterFacade } from '@app/core/services/router/+store/router.facade';

@Injectable()
export class ErrorEffects {
  constructor(private actions$: Actions, private routerFacade: RouterFacade) {}

  public throw404Error$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ErrorActions.throw404Error),
        tap(() => this.routerFacade.go({ path: ['/**'] }))
      ),
    { dispatch: false }
  );
}
