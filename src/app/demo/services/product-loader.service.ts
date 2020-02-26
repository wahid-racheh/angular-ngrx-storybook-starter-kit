import { Injectable } from '@angular/core';

import {
  IProductFormInterface,
  ITypeItem,
  ProductTypesEnum
} from '@app/demo/interfaces/product-form.interface';
import { ProductFormService } from './product-form.service';

@Injectable()
export class ProductLoaderService {
  constructor(private productFormService: ProductFormService) {}

  public loadProductForEdit(data: IProductFormInterface): void {
    this.productFormService.form.patchValue({
      customerDetails: {
        ...data.customerDetails
      }
    });

    for (const product of data.products) {
      const group = this.productFormService.addProduct();
      group.patchValue({
        size: product.size,
        types: this.prefillTypesSelection(
          group.get('types').value,
          product.types as ProductTypesEnum[]
        )
      });
    }
  }

  public prefillTypesSelection(types: ITypeItem[], selectedTypes: ProductTypesEnum[]): ITypeItem[] {
    return types.map((i: ITypeItem) => {
      if (selectedTypes.includes(i.name)) {
        i.selected = true;
      }
      return i;
    });
  }
}
