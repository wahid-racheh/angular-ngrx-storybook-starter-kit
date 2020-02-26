import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormValidatorsService } from '@app/shared/forms/services/form-validators.service';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() public control: FormControl;

  constructor(private formValidatorsService: FormValidatorsService) {}
  public get errorMessage(): any {
    if (this.control) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          return this.formValidatorsService.getValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        }
      }
    }
    return null;
  }
}
