import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';
import { NotFoundComponent } from '@app/shared/components/not-found/not-found.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

storiesOf('Shared|Components/NotFound', module).add('default', () => ({
  component: NotFoundComponent,
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [AppMockModules],
    provider: [ErrorFacade]
  }
}));
