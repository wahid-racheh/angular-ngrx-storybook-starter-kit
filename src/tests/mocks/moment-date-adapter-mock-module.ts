import { Injectable, NgModule } from '@angular/core';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter } from '@angular/material/core';
import { Moment } from 'moment';

@Injectable()
export class MomentDateAdapterMock extends MomentDateAdapter {
  public format(date: Moment, displayFormat: string): any {
    return this.clone(date);
  }
}

@NgModule({
  providers: [{ provide: DateAdapter, useClass: MomentDateAdapterMock }]
})
export class MomentDateAdapterMockModule {}
