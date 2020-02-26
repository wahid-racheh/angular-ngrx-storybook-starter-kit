import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { storiesOf } from '@storybook/angular';
import { of } from 'rxjs';

import { CustomerDetailsComponent } from '@app/demo/components/customer-details/customer-details.component';

import { AppMockModules } from '@tests/mocks/app-mock-modules';
import { getMockedForm } from '@tests/mocks/forms-mock';

import * as userMock from '@assets/mocks/user.mock.json';

const group: FormGroup = getMockedForm().get('customerDetails') as FormGroup;

storiesOf('Demo|Components/CustomerDetailsComponent', module).add('default', () => ({
  component: CustomerDetailsComponent,
  moduleMetadata: {
    imports: [AppMockModules],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  },
  props: {
    group
  },
  isLoading$: false,
  userList$: of(userMock.search.successResponse),
  user: userMock.getById.successResponse
}));
