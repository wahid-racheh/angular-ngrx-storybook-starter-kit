import { Component } from '@angular/core';

import { TextInputComponent } from '@app/shared/forms/components/text-input/text-input.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent extends TextInputComponent {
  constructor() {
    super();
  }
}
