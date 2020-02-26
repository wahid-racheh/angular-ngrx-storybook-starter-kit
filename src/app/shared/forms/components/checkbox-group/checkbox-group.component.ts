import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, FormControl } from '@angular/forms';

import { BaseInput } from '@app/shared/forms/classes/base-input.class';
import { handleInputValueChangesEvent } from '@app/shared/forms/helpers/form-helpers';
import { isEmpty } from '@app/shared/forms/utils/form-utils';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  @Input()
  public selectedValues: any[] = [];
  @Input()
  public optionKey: string = 'key';
  @Input()
  public optionValue: string = 'value';
  @Input()
  public data: any[];
  @Input()
  public displayInline;

  private preventInitialization = false;

  public ngOnInit(): void {
    if (this.group) {
      this.initFormArray();
      handleInputValueChangesEvent(
        this.controlArray.valueChanges,
        10,
        this.unsubscribe$
      ).subscribe((changes: any) => this.handleChange(changes));
    }
  }

  public get controlArray(): FormArray {
    return this.group.get(this.controlName) as FormArray;
  }

  public get itemsArray(): FormArray {
    return this.group.get(this.controlName) as FormArray;
  }

  private initFormArray(): void {
    if (this.group) {
      this.preventInitialization = false;
      const formArray: FormArray = this.mapToCheckboxArrayGroup(this.data);
      formArray.controls.forEach((control: AbstractControl) => {
        this.initSelectedValues(control);
        this.controlArray.push(control);
      });
    }
  }

  private initSelectedValues(control: AbstractControl) {
    const {
      value: { value: controlValue }
    } = control;
    if (this.selectedValues !== null && !!this.selectedValues.length) {
      const elem: any = this.selectedValues.find(item => item[this.optionValue] === controlValue);
      if (!isEmpty(elem)) {
        control.patchValue(
          {
            ...control.value,
            selected: elem.value
          },
          { emitEvent: false }
        );
      }
    }
  }

  private handleChange(values: any[]): void {
    const emptyValues = values.filter(item => item.value === null && item.selected === null);
    if (!!emptyValues.length && !this.preventInitialization) {
      this.preventInitialization = true;
      while (this.controlArray.length) {
        this.controlArray.removeAt(0);
      }
      this.initFormArray();
    } else {
      const items: any = values.filter(item => item.selected);
      this.onChange.emit(items);
    }
  }

  private mapToCheckboxArrayGroup(data: any[]): FormArray {
    return new FormArray(
      data.map((item: any) => {
        return new FormGroup({
          name: new FormControl(item[this.optionKey]),
          value: new FormControl(item[this.optionValue]),
          selected: new FormControl(false)
        });
      })
    );
  }
}
