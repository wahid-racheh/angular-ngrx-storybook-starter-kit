import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { withKnobs } from '@storybook/addon-knobs/angular';
import { storiesOf } from '@storybook/angular';
import moment from 'moment';

import { DatePickerComponent } from '@app/shared/forms/components/date-picker/date-picker.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

storiesOf('Shared|Forms/Components/DatePickerComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    moduleMetadata: {
      imports: [AppMockModules],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    },
    component: DatePickerComponent,
    props: {
      label: 'Date of birth',
      group: new FormGroup({
        dob: new FormControl()
      }),
      controlName: 'dob',
      placeholder: 'Date of birth',
      defaultValue: moment()
        .clone()
        .subtract(20, 'years'),
      minDate: moment()
        .clone()
        .subtract(50, 'years'),
      maxDate: moment()
    }
  }));
