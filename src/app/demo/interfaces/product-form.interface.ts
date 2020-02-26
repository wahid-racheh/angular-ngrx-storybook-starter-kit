import { SizeEnum } from '@app/core/types/size.enum';

export interface IProductFormInterface {
  selectedProduct?: IProductItem;
  products: IProductItem[];
  customerDetails: ICustomerDetails;
}

export interface ITypeItem {
  name: ProductTypesEnum;
  selected: boolean;
}

export interface IProductItem {
  size: SizeEnum;
  /**
   * A small hack for imitating a different model returned from server,
   * for the simplicity sake the same interface was used.
   * In real life the server model may vary from the form model.
   * In this case you need to maintain both the server model interface and the client form interface.
   */
  types: ITypeItem[] | ProductTypesEnum[];
}

export interface ICustomerDetails {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: {
    street: string;
    houseNum: string;
    city: string;
    floor: number;
  };
}

export enum ProductTypesEnum {
  OPTION1 = 'Option 1',
  OPTION2 = 'Option 2',
  OPTION3 = 'Option 3',
  OPTION4 = 'Option 4',
  OPTION5 = 'Option 5',
  OPTION6 = 'Option 6',
  OPTION7 = 'Option 7',
  OPTION8 = 'Option 8'
}
