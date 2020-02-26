import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {
  handleInputValueChangesEvent,
  validateAllFormFields
} from '@app/shared/forms/helpers/form-helpers';

// tslint:disable-next-line:no-big-function
describe('Form helpers', () => {
  describe('`validateAllFormFields`', () => {
    it('should calculate if the form is valid', () => {
      // GIVEN
      const form: FormGroup = new FormGroup({
        testControl: new FormControl(null, Validators.required),
        testControl1: new FormGroup({
          testControl2: new FormControl(null, Validators.required)
        }),
        testControl3: new FormArray([
          new FormGroup({
            testControl4: new FormControl(null, Validators.required)
          })
        ])
      });
      // WHEN
      validateAllFormFields(form);
      // THEN
      expect(form.valid).toBe(false);

      // GIVEN
      // WHEN
      form.get('testControl').setValue('test');
      form
        .get('testControl1')
        .get('testControl2')
        .setValue('test');
      const formArray: FormArray = form.get('testControl3') as FormArray;
      formArray.controls.forEach((g: FormGroup) => {
        g.get('testControl4').setValue('test');
      });
      // THEN
      expect(form.valid).toBe(true);
    });
  });

  describe('`handleInputValueChangesEvent`', () => {
    it('should return a promise', () => {
      // GIVEN
      const formControl: FormControl = new FormControl();
      const event: Observable<any> = handleInputValueChangesEvent(
        formControl.valueChanges,
        0,
        new Observable<any>()
      );
      // WHEN
      formControl.setValue('test control');
      // THEN
      event.subscribe((changes: any) => {
        expect(changes).toBeObservable();
      });
    });
  });
});
