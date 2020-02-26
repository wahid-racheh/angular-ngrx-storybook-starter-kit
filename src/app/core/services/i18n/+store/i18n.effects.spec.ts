import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import * as I18nActions from '@app/core/services/i18n/+store/i18n.actions';
import { I18nEffects } from '@app/core/services/i18n/+store/i18n.effects';
import { I18nService } from '@app/core/services/i18n/services/i18n.service';

describe('I18nEffects', () => {
  let effects: I18nEffects;
  let service: I18nService;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        I18nEffects,
        {
          provide: I18nService,
          useValue: {
            setLanguage: jest.fn()
          }
        },
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(I18nEffects);
    service = TestBed.inject(I18nService);
    actions$ = TestBed.inject(Actions);
  });

  describe('setLanguage$', () => {
    it('should dispatch a setLanguage action', (done: any) => {
      // GIVEN
      const lang: string = 'fr';
      const action = I18nActions.setLanguage({ lang });
      actions$ = of(action);
      // WHEN
      effects.setLanguage$.subscribe(() => {
        // THEN
        expect(service.setLanguage).toHaveBeenCalledWith(lang);
        done();
      });
    });
  });
});
