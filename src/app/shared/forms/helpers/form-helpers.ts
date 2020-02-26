import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

// Validate all form controls
export const validateAllFormFields = (fg): void => {
  Object.keys(fg.controls).forEach((field: any) => {
    const c = fg.get(field);
    if (c instanceof FormControl) {
      c.markAsTouched({ onlySelf: true });
    } else if (c instanceof FormGroup || c instanceof FormArray) {
      validateAllFormFields(c);
    }
  });
};

export const handleInputValueChangesEvent = (
  valueChanges: any,
  debounce: number,
  unsubscribe: Observable<any>
): Observable<any> => {
  return valueChanges.pipe(debounceTime(debounce), distinctUntilChanged(), takeUntil(unsubscribe));
};
