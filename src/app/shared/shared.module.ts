import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { ComponentsModule } from '@app/shared/components/components.module';
import { DirectivesModule } from '@app/shared/directives/directives.module';
import { FormsModule as SharedFormsModule } from '@app/shared/forms/forms.module';
import { PipesModule } from '@app/shared/pipes/pipes.module';

const sharedModules: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  TranslateModule,
  DirectivesModule,
  ComponentsModule,
  SharedFormsModule,
  PipesModule
];

@NgModule({
  imports: sharedModules,
  exports: [...sharedModules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
