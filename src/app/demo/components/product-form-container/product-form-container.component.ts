import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { DEMO_PRODUCT } from '@app/demo/constants/demo-product-item';
import { IProductFormInterface } from '@app/demo/interfaces/product-form.interface';
import { ProductFormValidatorsService } from '@app/demo/services/product-form-validators.service';
import { ProductFormService } from '@app/demo/services/product-form.service';
import { ProductLoaderService } from '@app/demo/services/product-loader.service';

@Component({
  selector: 'app-product-form-container',
  templateUrl: './product-form-container.component.html',
  styleUrls: ['./product-form-container.component.scss'],
  providers: [ProductFormService, ProductFormValidatorsService, ProductLoaderService]
})
export class ProductFormContainerComponent implements OnInit {
  public editMode = false;
  get form(): FormGroup {
    return this.productFormService.form;
  }

  get selectedProductGroup(): AbstractControl {
    if (!this.productFormService.productsArray.length) {
      return;
    }

    return this.productFormService.productsArray.at(this.form.get('selectedProduct').value);
  }

  constructor(
    private productLoaderService: ProductLoaderService,
    private productFormService: ProductFormService
  ) {}

  public ngOnInit() {
    // here you can check the page url if a product order id was specified
    // and load it from the server
    if (this.editMode) {
      this.productLoaderService.loadProductForEdit(DEMO_PRODUCT);
    }
  }

  public updateForm(changes: any) {}

  public async submit(data: IProductFormInterface) {
    if (!this.productFormService.isValid) {
      alert(`Please fill the form by the right data`);
      return;
    }

    const order: IProductFormInterface = this.productFormService.createProductOrder(data);

    alert(`Thanks ${order.customerDetails.firstName}, the product is on the way!`);

    if (this.editMode) {
      // update api endpoint call
    } else {
      // create api endpoint call
    }
  }

  public reset() {
    this.productFormService.resetForm();
  }

  public onProductAdd() {
    this.productFormService.addProduct();
    this.productFormService.selectProductForEdit(this.productFormService.productsArray.length - 1);
  }

  public onProductDelete(index: number) {
    this.productFormService.deleteProduct(index);
  }

  public onProductSelected(index: number) {
    this.productFormService.selectProductForEdit(index);
  }
}
