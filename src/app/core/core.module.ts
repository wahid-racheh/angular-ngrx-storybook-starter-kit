import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from '@app/core/helpers/module-import.helper';
import { ErrorModule } from '@app/core/interceptors/error/error.module';
import { I18nModule } from '@app/core/services/i18n/i18n.module';
import { init, InitService } from '@app/core/services/init.service';
import { RouterModule as CoreRouterModule } from '@app/core/services/router/router.module';
import { UserModule } from '@app/core/services/user/user.module';

@NgModule({
  imports: [CommonModule, HttpClientModule, I18nModule, UserModule, ErrorModule, CoreRouterModule],
  providers: [
    InitService,
    {
      provide: APP_INITIALIZER,
      deps: [InitService],
      useFactory: init,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Enforce Core Module is load only in the App Module.
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
