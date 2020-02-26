import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import * as RouterActions from '@app/core/services/router/+store/router.actions';

@Injectable()
export class RouterEffects {
  constructor(private action$: Actions, private router: Router, private location: Location) {}

  public go$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RouterActions.go),
        map(action => action.params),
        tap(({ path, query: queryParams, extras }) =>
          this.router.navigate(path, { queryParams, ...extras })
        )
      ),
    { dispatch: false }
  );

  public forward$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RouterActions.forward),
        tap(() => this.location.forward())
      ),
    { dispatch: false }
  );

  public back$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(RouterActions.back),
        tap(() => this.location.back())
      ),
    { dispatch: false }
  );
}
