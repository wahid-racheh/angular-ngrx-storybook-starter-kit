import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { NavbarComponent } from '@app/shared/components/navbar/navbar.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

storiesOf('Shared|Components/NavbarComponent', module).add('default', () => ({
  moduleMetadata: {
    imports: [AppMockModules],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  },
  component: NavbarComponent,
  props: {
    title: 'Nav bar title'
  }
}));
