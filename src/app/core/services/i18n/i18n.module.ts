import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { I18nEffects } from '@app/core/services/i18n/+store/i18n.effects';
import {
  i18nInitialState,
  i18nReducer,
  i18nStoreName
} from '@app/core/services/i18n/+store/i18n.reducer';
import { getTranslateModuleInstance } from '@app/core/services/i18n/helpers/i18n.helper';
import { I18nService } from '@app/core/services/i18n/services/i18n.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    getTranslateModuleInstance(),

    StoreModule.forFeature(i18nStoreName, i18nReducer, { initialState: i18nInitialState }),
    EffectsModule.forFeature([I18nEffects])
  ],
  providers: [I18nService, I18nEffects],
  exports: [TranslateModule]
})
export class I18nModule {}
