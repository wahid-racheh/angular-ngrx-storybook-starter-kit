import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class I18nService {
  constructor(private translate: TranslateService) {}

  get currentLang(): string {
    return this.translate.currentLang;
  }

  public setLanguage(lanKey: string): Observable<boolean> {
    this.translate.setDefaultLang(lanKey);
    this.translate.use(lanKey);
    return of(true);
  }

  public switchLanguage(): Observable<boolean> {
    const langKey: string = this.currentLang === 'fr' ? 'en' : 'fr';
    this.setLanguage(langKey);
    return of(true);
  }
}
