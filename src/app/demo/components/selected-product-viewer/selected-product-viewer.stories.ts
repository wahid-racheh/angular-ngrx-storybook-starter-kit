import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { storiesOf } from '@storybook/angular';

import { SelectedProductViewerComponent } from '@app/demo/components/selected-product-viewer/selected-product-viewer.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';
import { getMockedForm } from '@tests/mocks/forms-mock';

const productArray: FormArray = getMockedForm(3, true).get('products') as FormArray;
const selectedProductGroup: FormGroup = productArray.at(0) as FormGroup;

storiesOf('Demo|Components/SelectedProductViewerComponent', module).add('default', () => ({
  component: SelectedProductViewerComponent,
  moduleMetadata: {
    imports: [AppMockModules],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  },
  props: {
    selectedProductGroup
  }
}));
