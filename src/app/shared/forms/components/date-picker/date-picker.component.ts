import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import moment from 'moment';

import { BaseInput } from '@app/shared/forms/classes/base-input.class';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }

  @Input()
  public defaultValue: moment.Moment;
  @Input()
  public minDate: moment.Moment;
  @Input()
  public maxDate: moment.Moment;

  public ngOnInit() {
    if (this.group) {
      this.control = this.group.get(this.controlName) as FormControl;
      this.control.patchValue(this.defaultValue || null);
    }
  }

  public handleChange(date: moment.Moment): void {
    const newDate = moment()
      .clone()
      .year(date.year())
      .month(date.month())
      .date(date.date());
    this.onChange.emit(newDate);
  }
}
