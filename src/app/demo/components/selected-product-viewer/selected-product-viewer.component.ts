import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-selected-product-viewer',
  templateUrl: './selected-product-viewer.component.html',
  styleUrls: ['./selected-product-viewer.component.scss']
})
export class SelectedProductViewerComponent implements OnInit {
  @Input() public selectedProductGroup: AbstractControl;
  @Output() public addProduct = new EventEmitter();

  get typesArray(): FormArray {
    if (!this.selectedProductGroup) {
      return;
    }

    return this.selectedProductGroup.get('types') as FormArray;
  }

  constructor() {}

  public ngOnInit() {}
}
