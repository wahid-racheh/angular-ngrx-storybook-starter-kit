import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { withKnobs } from '@storybook/addon-knobs/angular';
import { storiesOf } from '@storybook/angular';

import { RadioComponent } from '@app/shared/forms/components/radio/radio.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

const data: any[] = [
  { id: 'ENGINEER', name: 'Software Ingineer' },
  { id: 'DOCTOR', name: 'Doctor' }
];

const metadata: any = {
  moduleMetadata: {
    imports: [AppMockModules],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  },
  component: RadioComponent
};

storiesOf('Shared|Forms/Components/RadioComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    ...metadata,
    props: {
      label: 'Job',
      group: new FormGroup({
        job: new FormControl()
      }),
      controlName: 'job',
      placeholder: 'Job',
      data,
      optionKey: 'name',
      optionValue: 'id'
    }
  }))
  .add('initial value', () => ({
    ...metadata,
    props: {
      label: 'Job',
      group: new FormGroup({
        job: new FormControl()
      }),
      controlName: 'job',
      placeholder: 'Job',
      data,
      selectedValue: data[1],
      optionKey: 'name',
      optionValue: 'id'
    }
  }))
  .add('column display', () => ({
    ...metadata,
    props: {
      label: 'Job',
      group: new FormGroup({
        job: new FormControl()
      }),
      controlName: 'job',
      placeholder: 'Job',
      displayInline: false,
      data,
      selectedValue: data[1],
      optionKey: 'name',
      optionValue: 'id'
    }
  }));
