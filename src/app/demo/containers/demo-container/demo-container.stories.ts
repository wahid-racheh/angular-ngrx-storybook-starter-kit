import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DemoFacade } from '@app/demo/+store/demo.facade';
import { CustomerDetailsComponent } from '@app/demo/components/customer-details/customer-details.component';
import { ProductFormContainerComponent } from '@app/demo/components/product-form-container/product-form-container.component';
import { ProductListComponent } from '@app/demo/components/product-list/product-list.component';
import { SelectedProductViewerComponent } from '@app/demo/components/selected-product-viewer/selected-product-viewer.component';
import { DemoContainerComponent } from '@app/demo/containers/demo-container/demo-container.component';
import { storiesOf } from '@storybook/angular';
import { AppMockModules } from '@tests/mocks/app-mock-modules';

storiesOf('Demo|Containers/DemoContainer', module).add('default', () => ({
  component: DemoContainerComponent,
  moduleMetadata: {
    imports: [AppMockModules],
    declarations: [
      ProductFormContainerComponent,
      SelectedProductViewerComponent,
      CustomerDetailsComponent,
      ProductListComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [DemoFacade]
  }
}));
