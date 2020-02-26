import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { withKnobs } from '@storybook/addon-knobs/angular';
import { storiesOf } from '@storybook/angular';

import { SizePickerComponent } from '@app/shared/forms/components/size-picker/size-picker.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

storiesOf('Shared|Forms/Components/SizePickerComponent', module)
  .addDecorator(withKnobs)
  .add('default', () => ({
    moduleMetadata: {
      imports: [AppMockModules],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    },
    component: SizePickerComponent
  }));
