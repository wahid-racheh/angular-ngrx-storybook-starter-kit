import { inject, TestBed } from '@angular/core/testing';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DEMO_PRODUCT } from '@app/demo/constants/demo-product-item';
import { ProductTypesEnum } from '@app/demo/interfaces/product-form.interface';
import { ProductFormValidatorsService } from '@app/demo/services/product-form-validators.service';
import { ProductFormService } from '@app/demo/services/product-form.service';
import { ProductLoaderService } from '@app/demo/services/product-loader.service';
import { FormValidatorsService } from '@app/shared/forms/services/form-validators.service';

describe('ProductLoaderService', () => {
  let productLoaderService: ProductLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        ProductLoaderService,
        ProductFormService,
        FormValidatorsService,
        ProductFormValidatorsService
      ]
    });
  });

  beforeEach(inject([ProductLoaderService], (service: ProductLoaderService) => {
    productLoaderService = service;
  }));

  it('should load products for edit', inject(
    [ProductFormService],
    (productFormService: ProductFormService) => {
      productLoaderService.loadProductForEdit(DEMO_PRODUCT);
      const productsArray: FormArray = productFormService.form.get('products') as FormArray;
      expect(productsArray.value.length).toBeGreaterThan(0);
    }
  ));

  it('should change selected state of selected items', () => {
    const typesList = [
      {
        selected: false,
        name: ProductTypesEnum.OPTION1
      },
      {
        selected: false,
        name: ProductTypesEnum.OPTION2
      },
      {
        selected: false,
        name: ProductTypesEnum.OPTION3
      }
    ];

    const result = productLoaderService.prefillTypesSelection(typesList, [
      ProductTypesEnum.OPTION2,
      ProductTypesEnum.OPTION3
    ]);
    expect(result[0].selected).toBe(false);
    expect(result[1].selected).toBe(true);
    expect(result[2].selected).toBe(true);
  });
});
