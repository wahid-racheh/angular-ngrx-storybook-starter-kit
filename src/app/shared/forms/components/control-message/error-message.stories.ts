import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { storiesOf } from '@storybook/angular';

import { ErrorMessageComponent } from '@app/shared/forms/components/control-message/error-message.component';
import { FormValidatorsService } from '@app/shared/forms/services/form-validators.service';

import { AppMockModules } from '@tests/mocks/app-mock-modules';
import { validateAllFormFields } from '../../helpers/form-helpers';

const formGroup = new FormGroup({
  inputName: new FormControl([null, Validators.required])
});
formGroup.get('inputName').setErrors({ required: true });

validateAllFormFields(formGroup);

storiesOf('Shared|Forms/Components/ErrorMessageComponent', module).add('default', () => ({
  component: ErrorMessageComponent,
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [AppMockModules],
    providers: [FormValidatorsService],
    declarations: []
  },
  props: {
    control: formGroup.get('inputName')
  }
}));
