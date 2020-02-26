import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgControl } from '@angular/forms';
import { of, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

/**
 * This directive allows via some inputs prepare an autocomplete with a common code.
 * This listen the control present in the host element (autocomplete field) with a value change observable.
 * Then a number character min and debounce time is applied with inputs.
 *
 * The inputs have a default value.
 * An output allows the parent to perform the search with the value.
 */
@Directive({
  selector: '[appAutocomplete]'
})
export class AutocompleteDirective implements OnInit, OnDestroy {
  @Input() public debounceTime: number;
  @Input() public minLength: number;
  @Output() public search = new EventEmitter<any>();
  @Output() public reset = new EventEmitter<any>();

  private unsubscribe$: Subject<void> = new Subject();

  constructor(private readonly control: NgControl) {
    this.debounceTime = 300;
    this.minLength = 2;
  }

  public ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        tap((term: string) => {
          if (term === null || term === undefined || !term.length || term.length < this.minLength) {
            this.reset.emit(term);
          }
        }),
        filter((term: string) => !!term),
        filter((term: string) => term.length >= this.minLength),
        distinctUntilChanged(),
        switchMap((term: string) => of(term)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((term: string) => {
        this.search.emit(term);
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
