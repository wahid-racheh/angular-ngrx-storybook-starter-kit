import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SafeHtmlPipe } from '@app/shared/pipes/safe-html/safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: { bypassSecurityTrustHtml: jest.fn() }
        }
      ]
    });
    sanitizer = TestBed.get(DomSanitizer);
    pipe = new SafeHtmlPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize provided html by calling bypassSecurityTrustHtml', () => {
    // GIVEN
    const htmlContent: string = '<div><p>hello</p></p></div>';
    // WHEN
    pipe.transform(htmlContent);
    // THEN
    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(htmlContent);
  });
});
