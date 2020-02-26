import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { get } from 'lodash';

import { BaseInput } from '@app/shared/forms/classes/base-input.class';
import { handleInputValueChangesEvent } from '@app/shared/forms/helpers/form-helpers';
import { isEmpty } from '@app/shared/forms/utils/form-utils';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends BaseInput implements OnInit {
  @Input()
  public selectedValue: any;
  @Input()
  public refIndex: number;
  @Input()
  public optionKey: string = 'key';
  @Input()
  public optionValue: string = 'value';
  @Input()
  public data: any[];

  @Input()
  public displayInline: boolean;

  constructor() {
    super();
  }

  public ngOnInit(): void {
    if (this.group) {
      this.control = this.group.get(this.controlName) as FormControl;
      handleInputValueChangesEvent(
        this.control.valueChanges,
        10,
        this.unsubscribe$
      ).subscribe((changes: any) => this.handleChange(changes));
      if (!isEmpty(this.selectedValue) && isEmpty(this.control.value)) {
        this.control.setValue(this.selectedValue[this.optionValue], { emitEvent: false });
      }
    }
  }

  private handleChange(value: any): void {
    if (!isEmpty(value)) {
      const element: any = this.data.find(item => item[this.optionValue] === value);
      this.onChange.emit({
        ...element,
        index: get(this.group, 'value.index')
      });
    }
  }
}
