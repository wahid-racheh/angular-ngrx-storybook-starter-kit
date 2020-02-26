import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ErrorEffects } from '@app/core/interceptors/error/+store/error.effects';
import {
  errorInitialState,
  errorReducer,
  errorStoreName
} from '@app/core/interceptors/error/+store/error.reducer';
import { ErrorInterceptorService } from '@app/core/interceptors/error/services/error-interceptor.service';

@NgModule({
  imports: [
    StoreModule.forFeature(errorStoreName, errorReducer, { initialState: errorInitialState }),
    EffectsModule.forFeature([ErrorEffects])
  ],
  providers: [
    ErrorEffects,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ]
})
export class ErrorModule {}
