import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { TranslateService, TranslateStore } from '@ngx-translate/core';

import { getTranslateModuleInstance } from '@app/core/services/i18n/helpers/i18n.helper';
import { I18nService } from '@app/core/services/i18n/services/i18n.service';

describe('I18nService', () => {
  const FR_LANG = 'fr';
  const EN_LANG = 'en';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, getTranslateModuleInstance()],
      providers: [I18nService, TranslateStore, TranslateService]
    });
  });

  it('should be created', () => {
    const service: I18nService = TestBed.inject(I18nService);
    expect(service).toBeTruthy();
  });

  it(`should set ${EN_LANG} language`, inject([I18nService], (i18nService: I18nService) => {
    // GIVEN
    // WHEN
    i18nService.setLanguage(EN_LANG);
    // THEN
    expect(i18nService.currentLang).toBeDefined();
    expect(i18nService.currentLang).toEqual(EN_LANG);
  }));

  it(`should set ${FR_LANG} language`, inject([I18nService], (i18nService: I18nService) => {
    // GIVEN
    // WHEN
    i18nService.setLanguage(FR_LANG);
    // THEN
    expect(i18nService.currentLang).toBeDefined();
    expect(i18nService.currentLang).toEqual(FR_LANG);
  }));

  it(`should switch language`, inject([I18nService], (i18nService: I18nService) => {
    // GIVEN
    spyOn(i18nService, 'setLanguage');
    // WHEN
    i18nService.switchLanguage();
    // THEN
    expect(i18nService.setLanguage).toHaveBeenCalled();
  }));
});
