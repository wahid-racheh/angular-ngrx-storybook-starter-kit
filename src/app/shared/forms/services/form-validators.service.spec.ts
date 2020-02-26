import { inject, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { FormValidatorsService } from '@app/shared/forms/services/form-validators.service';

describe('FormValidatorsService', () => {
  let validatorService: FormValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FormValidatorsService]
    });
  });

  beforeEach(inject([FormValidatorsService], (service: FormValidatorsService) => {
    validatorService = service;
  }));

  describe('`getValidatorErrorMessage`', () => {
    it('should return `required` error message', () => {
      // GIVEN
      // WHEN
      const error: any = validatorService.getValidatorErrorMessage('required', {});
      // THEN
      expect(error).toBe('FORM_ERROR_MESSAGES.REQUIRED');
    });

    it('should return `minlength` error message', () => {
      // GIVEN
      // WHEN
      const error: any = validatorService.getValidatorErrorMessage('minlength', {
        requiredLength: 2
      });
      // THEN
      expect(error.key).toBe('FORM_ERROR_MESSAGES.MIN_LENGTH');
      expect(error.value).toBe('2');
    });
  });

  describe('`exactLength` Validator', () => {
    let formValidator: ValidatorFn;
    beforeEach(() => {
      formValidator = validatorService.exactLength(2);
    });

    it('should return error when text length not equal to 2', () => {
      // GIVEN
      // WHEN
      const result = formValidator(new FormControl('123456'));
      // THEN
      expect(result.exactLength).toBeTruthy();
    });

    it('should not return error when text length equal to 2', () => {
      // GIVEN
      // WHEN
      const result = formValidator(new FormControl('12'));
      // THEN
      expect(result).toBe(null);
    });
  });

  describe('`validateAllFormFields` Validator', () => {
    it('should calculate if the form is valid', () => {
      // GIVEN
      const form: FormGroup = new FormGroup({
        firstName: new FormControl(null, Validators.required)
      });

      // WHEN
      validatorService.validateAllFormFields(form);
      // THEN
      expect(form.valid).toBe(false);

      // WHEN
      form.get('firstName').setValue('test');
      // THEN
      expect(form.valid).toBe(true);
    });
  });
});
