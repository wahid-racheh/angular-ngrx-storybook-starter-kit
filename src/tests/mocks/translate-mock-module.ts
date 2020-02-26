import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Pipe,
  PipeTransform
} from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

function parseText(text: string): string {
  return text ? text.split('.').pop() : '';
}

export class TranslateServiceMock {
  public onLangChange: EventEmitter<LangChangeEvent> = new EventEmitter();
  public onTranslationChange: EventEmitter<string> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<string> = new EventEmitter();

  public get(content: string): Observable<string> {
    return of(content ? content.split('.').pop() : '');
  }

  public instant(key: any): string {
    return parseText(key);
  }
}

@Pipe({ name: 'translate' })
export class TranslateMockPipe implements PipeTransform {
  public transform(text: string): string {
    return parseText(text);
  }
}

@Directive({
  selector: '[translate]'
})
export class TranslateMockDirective implements AfterViewChecked {
  @Input()
  public translateParams: any;
  constructor(private readonly _element: ElementRef) {}

  public ngAfterViewChecked(): void {
    this._element.nativeElement.innerText = parseText(this._element.nativeElement.innerText);
  }
}

@NgModule({
  declarations: [TranslateMockPipe, TranslateMockDirective],
  exports: [TranslateMockPipe, TranslateMockDirective],
  providers: [TranslateMockPipe, { provide: TranslateService, useClass: TranslateServiceMock }]
})
export class TranslateMockModule {}
