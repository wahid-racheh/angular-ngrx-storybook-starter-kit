import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared/shared.module';

import { MomentDateAdapterMockModule } from '@tests/mocks/moment-date-adapter-mock-module';
import { StoreMockModule } from '@tests/mocks/store-mock-module';
import { TranslateMockModule } from '@tests/mocks/translate-mock-module';

const mockModules = [
  SharedModule,
  BrowserAnimationsModule,
  TranslateMockModule,
  StoreMockModule,
  MomentDateAdapterMockModule
];

@NgModule({
  imports: mockModules,
  exports: mockModules
})
export class AppMockModules {}
