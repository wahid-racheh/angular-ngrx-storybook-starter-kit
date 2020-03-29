import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ErrorActions from '@app/core/interceptors/error/+store/error.actions';
import { ErrorStore } from '@app/core/interceptors/error/+store/error.reducer';
import { errorQuery } from '@app/core/interceptors/error/+store/error.selectors';
import { CustomError } from '@app/core/interceptors/error/interfaces/custom-error';

@Injectable({
  providedIn: 'root'
})
export class ErrorFacade {
  public state$ = this.store.select(errorQuery.getState);
  public code$ = this.store.select(errorQuery.getCode);
  public message$ = this.store.select(errorQuery.getMessage);
  public error$ = this.store.select(errorQuery.getError);
  public showErrorPage$ = this.store.select(errorQuery.showErrorPage);

  constructor(private store: Store<ErrorStore>) {}

  public resetState() {
    this.store.dispatch(ErrorActions.resetState());
  }

  public throw500Error(error: HttpErrorResponse) {
    this.store.dispatch(ErrorActions.throw500Error({ error }));
  }

  public throwUnauthorizedError(error: HttpErrorResponse) {
    this.store.dispatch(ErrorActions.throwUnauthorizedError({ error }));
  }

  public throw404Error(error: HttpErrorResponse) {
    this.store.dispatch(ErrorActions.throw404Error({ error }));
  }

  public throwCustomError(error: CustomError) {
    this.store.dispatch(ErrorActions.throwCustomError({ error }));
  }

  public showErrorPage() {
    this.store.dispatch(ErrorActions.showErrorPage());
  }

  public hideErrorPage() {
    this.store.dispatch(ErrorActions.hideErrorPage());
  }
}
