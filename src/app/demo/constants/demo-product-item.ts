import { SizeEnum } from '@app/core/types/size.enum';
import {
  IProductFormInterface,
  ProductTypesEnum
} from '@app/demo/interfaces/product-form.interface';

export const DEMO_PRODUCT: IProductFormInterface = {
  customerDetails: {
    address: {
      floor: 1,
      street: 'Test street',
      houseNum: '44',
      city: 'New York'
    },
    lastName: 'Lover',
    firstName: 'Product',
    phoneNumber: '100100100'
  },
  products: [
    {
      types: [ProductTypesEnum.OPTION1, ProductTypesEnum.OPTION2, ProductTypesEnum.OPTION3] as any,
      size: SizeEnum.MEDIUM
    }
  ]
};
