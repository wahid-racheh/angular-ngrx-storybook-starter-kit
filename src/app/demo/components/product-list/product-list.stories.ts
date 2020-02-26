import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { ProductListComponent } from '@app/demo/components/product-list/product-list.component';
import { ProductFormValidatorsService } from '@app/demo/services/product-form-validators.service';
import { ProductFormService } from '@app/demo/services/product-form.service';

import { AppMockModules } from '@tests/mocks/app-mock-modules';
import { getMockedForm } from '@tests/mocks/forms-mock';

storiesOf('Demo|Components/ProductListComponent', module).add('default', () => ({
  component: ProductListComponent,
  moduleMetadata: {
    imports: [AppMockModules],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [ProductFormService, ProductFormValidatorsService]
  },
  props: {
    group: getMockedForm()
  }
}));
