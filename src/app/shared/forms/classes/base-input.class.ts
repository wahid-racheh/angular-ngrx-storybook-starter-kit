import { EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { unsubscribe } from '@app/core/utils/utils';

export class BaseInput implements OnDestroy {
  @Input()
  public inputStyle: any;
  @Input()
  public cssClassName: string;
  @Input()
  public placeholder: string;
  @Input()
  public label: string;
  @Input()
  public group: FormGroup;
  @Input()
  public controlName: string;
  @Input()
  public attributes: any;

  @Output()
  public onBlur: EventEmitter<any> = new EventEmitter();
  @Output()
  public onChange: EventEmitter<any> = new EventEmitter();
  @Output()
  public onFocus: EventEmitter<any> = new EventEmitter();

  @Input()
  public debounceTime: number = 300;
  public control: FormControl;
  public unsubscribe$: Subject<void> = new Subject<void>();

  public ngOnDestroy(): void {
    unsubscribe(this.unsubscribe$);
  }
}
