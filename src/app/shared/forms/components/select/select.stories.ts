import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { withKnobs } from '@storybook/addon-knobs/angular';
import { storiesOf } from '@storybook/angular';

import { SelectComponent } from '@app/shared/forms/components/select/select.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

storiesOf('Shared|Forms/Components/SelectComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    moduleMetadata: {
      imports: [AppMockModules],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    },
    component: SelectComponent,
    props: {
      label: 'Gender',
      group: new FormGroup({
        gender: new FormControl()
      }),
      controlName: 'gender',
      placeholder: 'Gender',
      data: [
        { id: 'M', text: 'Male' },
        { id: 'F', text: 'Female' }
      ],
      selectedValue: 'M',
      optionKey: 'text',
      optionValue: 'id'
    }
  }));
