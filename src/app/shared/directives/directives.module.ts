import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxInitDirective } from '@app/shared/directives/ngx-init/ngx-init.directive';

const sharedDirectives: any[] = [NgxInitDirective];

@NgModule({
  declarations: [sharedDirectives],
  exports: [sharedDirectives],
  imports: [CommonModule]
})
export class DirectivesModule {}
