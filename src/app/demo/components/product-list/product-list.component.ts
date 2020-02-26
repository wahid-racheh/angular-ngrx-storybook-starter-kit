import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

import { SizeEnum } from '@app/core/types/size.enum';
import { IProductItem, ITypeItem } from '@app/demo/interfaces/product-form.interface';
import { ProductFormService } from '@app/demo/services/product-form.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() public group: FormGroup;

  @Output() public deleteProduct = new EventEmitter<number>();
  @Output() public addProduct = new EventEmitter();
  @Output() public productSelected = new EventEmitter<number>();

  get productsArray(): FormArray {
    return this.group.get('products') as FormArray;
  }

  constructor(private productFormService: ProductFormService) {}

  public getProductListItemClassStates(product: AbstractControl, index: number) {
    return {
      'productList__item--active': this.group.get('selectedProduct').value === index,
      'productList__item--has-error': !product.valid && product.dirty
    };
  }

  public getProductTitle(product: IProductItem): string {
    const selectedTypes = this.productFormService
      .getSelectedTypes(product.types as ITypeItem[])
      .map(i => i.name);

    const typesString = this.getTypesString(selectedTypes);
    const sizeString = this.getProductSizeTitle(product.size);

    return `${sizeString} product ${typesString}`;
  }

  private getTypesString(types: string[]): string {
    if (!types || !types.length) {
      return '';
    }

    return `- ${types.toString()}`;
  }

  private getProductSizeTitle(size: SizeEnum): string {
    let productSize;
    switch (size) {
      case SizeEnum.SMALL:
        productSize = 'S';
        break;
      case SizeEnum.MEDIUM:
        productSize = 'M';
        break;
      case SizeEnum.LARGE:
        productSize = 'L';
        break;
    }

    return productSize;
  }
}
