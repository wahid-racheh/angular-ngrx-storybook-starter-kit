import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BaseInput } from '@app/shared/forms/classes/base-input.class';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseInput implements OnInit {
  @Input()
  public selectedValue: any;
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
      this.control.setValue(this.selectedValue, { emitEvent: false });
    }
  }

  public handleChange(event: any): void {
    const { value } = event;
    if (value) {
      const element: any = this.data.find(
        item => item[this.optionValue] === event[this.optionValue]
      );
      this.onChange.emit(element);
    }
  }
}
