import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { MainComponent } from '@app/layout/pages/main/main.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

storiesOf('Layout|Components/Main', module).add('default', () => ({
  component: MainComponent,
  moduleMetadata: {
    imports: [AppMockModules],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }
}));
