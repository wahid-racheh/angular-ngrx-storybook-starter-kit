import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { withKnobs } from '@storybook/addon-knobs/angular';
import { storiesOf } from '@storybook/angular';

import { CheckboxGroupComponent } from '@app/shared/forms/components/checkbox-group/checkbox-group.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

const data: any[] = [
  { id: 1, text: '1 year' },
  { id: 2, text: '2 years' }
];

const group = new FormGroup({
  nbYearsOfExperience: new FormArray([])
});

const metadata: any = {
  moduleMetadata: {
    imports: [AppMockModules],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  },
  component: CheckboxGroupComponent
};

storiesOf('Shared|Forms/Components/CheckboxGroupComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    ...metadata,
    props: {
      label: 'Years of experience',
      group,
      controlName: 'nbYearsOfExperience',
      placeholder: 'Years of experience',
      data,
      optionKey: 'text',
      optionValue: 'id'
    }
  }))
  .add('initial value', () => ({
    ...metadata,
    props: {
      label: 'Years of experience',
      group,
      controlName: 'nbYearsOfExperience',
      placeholder: 'Years of experience',
      data,
      optionKey: 'text',
      optionValue: 'id',
      selectedValues: [data[1]]
    }
  }))
  .add('column display', () => ({
    ...metadata,
    props: {
      label: 'Years of experience',
      group,
      controlName: 'nbYearsOfExperience',
      placeholder: 'Years of experience',
      data,
      optionKey: 'text',
      optionValue: 'id',
      selectedValues: [data[1]],
      displayInline: false
    }
  }));
