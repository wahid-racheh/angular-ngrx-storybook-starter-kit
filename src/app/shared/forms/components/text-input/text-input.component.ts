import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BaseInput } from '@app/shared/forms/classes/base-input.class';
import { handleInputValueChangesEvent } from '@app/shared/forms/helpers/form-helpers';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends BaseInput implements OnInit {
  constructor() {
    super();
  }
  public ngOnInit(): void {
    if (this.group) {
      this.control = this.group.get(this.controlName) as FormControl;
      handleInputValueChangesEvent(
        this.control.valueChanges,
        this.debounceTime,
        this.unsubscribe$
      ).subscribe((changes: any) => this.handleChange(changes));
    }
  }

  public handleBlur(event: any): void {
    if (event.type === 'blur' || (event.type === 'keypress' && event.keyCode === 13)) {
      this.onBlur.emit(event);
    }
  }

  public handleFocus(event: any): void {
    if (event.type === 'focus') {
      this.onFocus.emit(event);
    }
  }

  public handleChange(event: any): void {
    this.onChange.emit(event);
  }
}
