import { inject, TestBed } from '@angular/core/testing';
import { FormArray, FormGroup, ValidatorFn } from '@angular/forms';

import { ProductFormValidatorsService } from '@app/demo/services/product-form-validators.service';
import { getMockedForm } from '@tests/mocks/forms-mock';

function getForm(size: number): FormGroup {
  const productArray: FormArray = getMockedForm(size, true).get('products') as FormArray;
  return productArray.at(0) as FormGroup;
}

describe('ProductFormValidatorsService', () => {
  let validatorService: ProductFormValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ProductFormValidatorsService]
    });
  });

  beforeEach(inject([ProductFormValidatorsService], (service: ProductFormValidatorsService) => {
    validatorService = service;
  }));

  describe('productFormValidator', () => {
    let formValidator: ValidatorFn;
    beforeEach(() => {
      formValidator = validatorService.productFormValidator();
    });

    it('should return error when there is no product', () => {
      const result: any = formValidator(
        new FormGroup({
          products: new FormArray([])
        })
      );

      expect(result.noProducts).toBeTruthy();
    });

    it('should not return error when products exist', () => {
      const result: any = formValidator(
        new FormGroup({
          products: new FormArray([new FormGroup({})])
        })
      );

      expect(result).toBe(null);
    });
  });

  describe('productItemValidator', () => {
    let formValidator: ValidatorFn;
    beforeEach(() => {
      formValidator = validatorService.productItemValidator();
    });

    it('should return error when selected product type is not `LARGE` and 4 or less options are selected ', () => {
      const form = getForm(2);
      const result = formValidator(form);
      expect(result.productTypeSize).not.toBe(null);
    });

    it('should not return error when selected product type is `LARGE` and more than 4 options are selected ', () => {
      const form = getForm(3);
      const result = formValidator(form);
      expect(result).toBe(null);
    });
  });
});
