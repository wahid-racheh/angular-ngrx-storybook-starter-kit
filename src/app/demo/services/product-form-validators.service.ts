import { Injectable } from '@angular/core';
import { FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import { SizeEnum } from '@app/core/types/size.enum';
import { ITypeItem } from '@app/demo/interfaces/product-form.interface';

@Injectable()
export class ProductFormValidatorsService {
  public productFormValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const errors: ValidationErrors = {};
      const formArray = control.get('products') as FormArray;
      const { value } = formArray;
      if (!value.length) {
        errors.noProducts = {
          message: 'You must select at least one product to order'
        };
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  public checkboxFormValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const { value: array } = control;
      const selectedValues = array.filter(i => i.selected);
      return selectedValues !== null && !selectedValues.length ? { required: true } : null;
    };
  }

  public productItemValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const errors: ValidationErrors = {};

      const productSize: SizeEnum = control.get('size').value;
      const productTypes: ITypeItem[] = control.get('types').value.filter(i => i.selected);

      if (productSize !== SizeEnum.LARGE && productTypes.length > 4) {
        errors.productTypeSize = {
          message: 'To use more then 4 types you must selected large product'
        };
      }

      return Object.keys(errors).length ? errors : null;
    };
  }
}
