import { Component } from '@angular/core';

import { TextInputComponent } from '@app/shared/forms/components/text-input/text-input.component';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent extends TextInputComponent {
  constructor() {
    super();
  }
}
