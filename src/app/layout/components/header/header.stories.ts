import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { HeaderComponent } from '@app/layout/components/header/header.component';

storiesOf('Layout|Components/Header', module).add('default', () => ({
  component: HeaderComponent,
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }
}));
