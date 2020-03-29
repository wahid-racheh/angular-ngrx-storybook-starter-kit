import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { BaseInput } from '@app/shared/forms/classes/base-input.class';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent extends BaseInput implements OnInit {
  constructor() {
    super();
    this.debounceTime = 300;
    this.minLength = 2;
    this.spinnerColor = 'primary';
    this.spinnerSize = 20;
    this.showSpinner = false;
  }

  @Input('data') public items: any;
  @Input() public searchKey: string = 'key';
  @Input() public minLength: number;
  @Input() public asyncQuery: boolean;
  @Input() public spinnerColor: string;
  @Input() public spinnerSize: number;
  @Input() public showSpinner: boolean;

  @Output() public onSelectItem: EventEmitter<void> = new EventEmitter();
  @Output() public onSearch: EventEmitter<string> = new EventEmitter();
  @Output() public onReset: EventEmitter<string> = new EventEmitter();

  public filteredItems: any;

  public get data(): Observable<any[]> {
    return this.items instanceof Observable ? this.items : of(this.items);
  }

  public ngOnInit(): void {
    this.filteredItems = this.data;
    if (this.group) {
      this.control = this.group.get(this.controlName) as FormControl;
    }
  }

  public resetControl(): void {
    if (this.control.value === null || !this.control.value.toString().length) {
      this.showSpinner = false;
      this.onReset.emit();
      this.filteredItems = this.data;
    }
  }

  public handleSelectItem(event: MatAutocompleteSelectedEvent): void {
    this.showSpinner = false;
    const item: any = event.option.value;
    this.control.setValue(item[this.searchKey], { emitEvent: false });
    this.onSelectItem.emit(item);
  }

  public handleSearch(value: string): void {
    if (this.asyncQuery) {
      this.onSearch.emit(value);
    } else {
      this.filteredItems = this.filterItems(value);
    }
  }

  private doFilter(data: any[], value: string): Observable<any[]> {
    return of(
      data.filter(item => item[this.searchKey].toLowerCase().indexOf(value.toLowerCase()) === 0)
    );
  }

  private filterItems(value: string): Observable<any[]> {
    if (this.items instanceof Observable) {
      return this.items.pipe(switchMap(data => this.doFilter(data, value)));
    }
    return this.doFilter(this.items, value);
  }
}
