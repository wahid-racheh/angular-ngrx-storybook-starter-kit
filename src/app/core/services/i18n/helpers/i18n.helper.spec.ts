import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import {
  getTranslateModuleInstance,
  httpLoaderFactory
} from '@app/core/services/i18n/helpers/i18n.helper';

describe('Helper `HttpLoaderFactory`', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: () => of({}),
            put: () => of({})
          }
        }
      ]
    });
  });

  it('should be defined', inject([HttpClient], (httpMock: HttpClient) => {
    // GIVEN
    // WHEN
    const obj = httpLoaderFactory(httpMock);
    // THEN
    expect(obj).toBeDefined();
  }));

  it('should return `TranslateModuleInstance`', () => {
    // GIVEN
    // WHEN
    const obj = getTranslateModuleInstance();
    // THEN
    expect(obj).toBeDefined();
  });
});
