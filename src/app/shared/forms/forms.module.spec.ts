import { FormsModule as SharedFormsModule } from '@app/shared/forms/forms.module';

describe('FormsModule', () => {
  let formsModule: SharedFormsModule;

  beforeEach(() => {
    formsModule = new SharedFormsModule();
  });

  it('should create an instance', () => {
    expect(formsModule).toBeTruthy();
  });
});
