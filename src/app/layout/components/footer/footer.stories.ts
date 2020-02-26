import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { FooterComponent } from '@app/layout/components/footer/footer.component';

storiesOf('Layout|Components/Footer', module).add('default', () => ({
  component: FooterComponent,
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }
}));
