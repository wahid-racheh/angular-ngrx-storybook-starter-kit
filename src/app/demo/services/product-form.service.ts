import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  IProductFormInterface,
  ITypeItem,
  ProductTypesEnum
} from '@app/demo/interfaces/product-form.interface';
import { SizeEnum } from '@app/core/types/size.enum';
import { FormValidatorsService } from '@app/shared/forms/services/form-validators.service';
import { ProductFormValidatorsService } from './product-form-validators.service';

@Injectable()
export class ProductFormService {
  public availableTypes = [...Object.values(ProductTypesEnum)];
  public form: FormGroup;

  constructor(
    private formValidatorsService: FormValidatorsService,
    private productValidatorsService: ProductFormValidatorsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group(
      {
        selectedProduct: null,
        products: this.fb.array([]),
        customerDetails: this.fb.group({
          customer: null,
          firstName: ['', Validators.compose([Validators.required])],
          lastName: [null, Validators.required],
          gender: [null, Validators.required],
          dob: [null, Validators.required],
          phoneNumber: [
            null,
            Validators.compose([
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(12)
            ])
          ],
          address: this.fb.group({
            street: [null, Validators.required],
            suite: [null, Validators.required],
            city: [null, Validators.required],
            zipcode: [null, Validators.required]
          })
        })
      },
      {
        validator: this.productValidatorsService.productFormValidator()
      }
    );
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.formValidatorsService.validateAllFormFields(this.form);
      return false;
    }

    return true;
  }

  get productsArray(): FormArray {
    return this.form.get('products') as FormArray;
  }

  public selectProductForEdit(index: number) {
    this.form.get('selectedProduct').setValue(index);
  }

  public addProduct(): FormGroup {
    const productGroup = this.getProductFormGroup();
    this.productsArray.push(this.getProductFormGroup());

    this.form.markAsDirty();

    return productGroup;
  }

  public deleteProduct(index: number): void {
    this.productsArray.removeAt(index);
    this.form.markAsDirty();
  }

  public getProductFormGroup(size: SizeEnum = SizeEnum.MEDIUM): FormGroup {
    return this.fb.group(
      {
        size: [size],
        types: this.mapToCheckboxArrayGroup(this.availableTypes)
      },
      {
        validator: this.productValidatorsService.productItemValidator()
      }
    );
  }

  public createProductOrder(data: IProductFormInterface): IProductFormInterface {
    const order = {
      customerDetails: data.customerDetails,
      products: data.products
    };

    for (const product of order.products) {
      product.types = this.getSelectedTypes(product.types as ITypeItem[]).map((i: any) => {
        return i.name;
      });
    }

    return order;
  }

  public getSelectedTypes(types: ITypeItem[]): ITypeItem[] {
    return types.filter(i => i.selected);
  }

  public resetForm() {
    while (this.productsArray.length) {
      this.productsArray.removeAt(0);
    }
    this.form.reset();
  }

  /**
   * Create a form array for a multi checkbox array selection
   *  const types: new FormArray(
   *    data.map((i: string) => {
   *     return new FormGroup({
   *       name: new FormControl(i),
   *       selected: new FormControl(false)
   *     });
   *   })
   *  );
   */
  private mapToCheckboxArrayGroup(data: string[]): FormArray {
    return this.fb.array(
      data.map((i: string) => {
        return this.fb.group({
          name: i,
          selected: false
        });
      })
    );
  }
}
