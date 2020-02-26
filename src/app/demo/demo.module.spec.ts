import { DemoModule } from '@app/demo/demo.module';

describe('FormsModule', () => {
  let demoModule: DemoModule;

  beforeEach(() => {
    demoModule = new DemoModule();
  });

  it('should create an instance', () => {
    expect(demoModule).toBeTruthy();
  });
});
