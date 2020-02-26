import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '@app/shared/components/material/material.module';
import { NavbarComponent } from '@app/shared/components/navbar/navbar.component';
import { NotFoundComponent } from '@app/shared/components/not-found/not-found.component';
import { DirectivesModule } from '@app/shared/directives/directives.module';

const sharedComponents: any[] = [NotFoundComponent, NavbarComponent];

@NgModule({
  imports: [CommonModule, MaterialModule, TranslateModule, DirectivesModule],
  declarations: [...sharedComponents],
  exports: [MaterialModule, ...sharedComponents],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ComponentsModule {}
