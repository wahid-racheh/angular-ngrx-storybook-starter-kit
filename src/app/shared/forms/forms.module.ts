import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '@app/shared/components/material/material.module';
import { AutoCompleteComponent } from '@app/shared/forms/components/auto-complete/auto-complete.component';

import { DirectivesModule } from '@app/shared/directives/directives.module';

import { CheckboxGroupComponent } from '@app/shared/forms/components/checkbox-group/checkbox-group.component';
import { ErrorMessageComponent } from '@app/shared/forms/components/control-message/error-message.component';
import { DatePickerComponent } from '@app/shared/forms/components/date-picker/date-picker.component';

import { NumberComponent } from '@app/shared/forms/components/number/number.component';
import { RadioComponent } from '@app/shared/forms/components/radio/radio.component';
import { SelectComponent } from '@app/shared/forms/components/select/select.component';
import { SizePickerComponent } from '@app/shared/forms/components/size-picker/size-picker.component';
import { TextAreaComponent } from '@app/shared/forms/components/text-area/text-area.component';
import { TextInputComponent } from '@app/shared/forms/components/text-input/text-input.component';
import { AutocompleteDirective } from '@app/shared/forms/directives/autocomplete/autocomplete.directive';
import { FormValidatorsService } from '@app/shared/forms/services/form-validators.service';

const componentsList = [
  AutocompleteDirective,
  ErrorMessageComponent,
  SizePickerComponent,
  NumberComponent,
  TextInputComponent,
  TextAreaComponent,
  AutoCompleteComponent,
  RadioComponent,
  CheckboxGroupComponent,
  SelectComponent,
  DatePickerComponent
];

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    ReactiveFormsModule,
    TranslateModule,
    MaterialModule,
    DirectivesModule
  ],
  providers: [FormValidatorsService],
  declarations: [...componentsList],
  exports: [...componentsList]
})
export class FormsModule {}
