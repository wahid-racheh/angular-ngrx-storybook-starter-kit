import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ProductTypesEnum } from '@app/demo/interfaces/product-form.interface';

// tslint:disable-next-line:bool-param-default
export function getMockedForm(size?: number, isSelected?: boolean, data?: any[]): FormGroup {
  const types: any = data || [...Object.values(ProductTypesEnum)];

  return new FormGroup({
    selectedProduct: new FormControl(null),
    products: new FormArray([
      new FormGroup({
        size: new FormControl(size || 2),
        types: new FormArray(
          types.map((i: string) => {
            return new FormGroup({
              name: new FormControl(i),
              selected: new FormControl(!!isSelected)
            });
          })
        )
      })
    ]),
    customerDetails: new FormGroup({
      customer: new FormControl(''),
      gender: new FormControl(''),
      dob: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl(''),
      address: new FormGroup({
        street: new FormControl(''),
        suite: new FormControl(''),
        city: new FormControl(''),
        zipcode: new FormControl('')
      })
    })
  });
}
