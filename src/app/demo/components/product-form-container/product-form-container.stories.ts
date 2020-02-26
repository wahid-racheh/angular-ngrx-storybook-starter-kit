import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';

import { DemoFacade } from '@app/demo/+store/demo.facade';
import { CustomerDetailsComponent } from '@app/demo/components/customer-details/customer-details.component';
import { ProductFormContainerComponent } from '@app/demo/components/product-form-container/product-form-container.component';
import { ProductListComponent } from '@app/demo/components/product-list/product-list.component';
import { SelectedProductViewerComponent } from '@app/demo/components/selected-product-viewer/selected-product-viewer.component';
import { ProductFormService } from '@app/demo/services/product-form.service';
import { ProductLoaderService } from '@app/demo/services/product-loader.service';

import { AppMockModules } from '@tests/mocks/app-mock-modules';

storiesOf('Demo|Components/ProductFormContainerComponent', module).add('default', () => ({
  component: ProductFormContainerComponent,
  moduleMetadata: {
    imports: [AppMockModules],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [SelectedProductViewerComponent, CustomerDetailsComponent, ProductListComponent],
    providers: [ProductLoaderService, ProductFormService, DemoFacade]
  }
}));
