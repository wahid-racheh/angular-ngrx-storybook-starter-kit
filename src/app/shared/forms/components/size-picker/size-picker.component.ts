import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SizeEnum } from '@app/core/types/size.enum';

@Component({
  selector: 'app-size-picker',
  templateUrl: './size-picker.component.html',
  styleUrls: ['./size-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SizePickerComponent),
      multi: true
    }
  ]
})
export class SizePickerComponent implements ControlValueAccessor {
  public size: SizeEnum;
  public SizeEnum = SizeEnum;

  constructor() {}

  public changeSize(size: SizeEnum) {
    this.size = size;
    this.propagateChange(size);
  }

  public propagateChange = (value: SizeEnum) => {};
  public writeValue(value: SizeEnum) {
    this.size = value;
  }

  public registerOnChange(fn) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {}
}
