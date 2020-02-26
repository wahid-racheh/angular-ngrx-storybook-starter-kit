import { NgxInitDirective } from '@app/shared/directives/ngx-init/ngx-init.directive';

describe('NgxInitDirective', () => {
  it('should create an instance', () => {
    const directive = new NgxInitDirective(null, null);
    expect(directive).toBeTruthy();
  });
});
