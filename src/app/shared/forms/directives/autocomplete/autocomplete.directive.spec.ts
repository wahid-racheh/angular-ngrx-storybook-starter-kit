import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { timer } from 'rxjs';

import { AutocompleteDirective } from '@app/shared/forms/directives/autocomplete/autocomplete.directive';

/**
 * Allows to test the autocomplete directive.
 */
@Component({
  selector: 'app-test-search',
  template: `
    <input
      type="text"
      appAutocomplete
      [debounceTime]="debounceTime"
      [minLength]="minLength"
      [formControl]="control"
      (search)="onSelect($event)"
    />
  `
})
export class TestDirectiveComponent {
  public control: FormControl;

  @Input() public debounceTime: number;
  @Input() public minLength: number;

  constructor() {
    this.control = new FormControl();
  }

  /**
   * Event called when a product is selected.
   * An output is emitted to the parent with the selected product.
   */
  public onSelect(): void {}
}

describe('AutocompleteDirective', () => {
  let component: TestDirectiveComponent;
  let fixture: ComponentFixture<TestDirectiveComponent>;
  let onSelectSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TestDirectiveComponent, AutocompleteDirective],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    onSelectSpy = jest.spyOn(component, 'onSelect');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not called onSelect method when min length is not exceeded', async () => {
    // Given.
    component.debounceTime = 300;
    component.minLength = 3;

    // When.
    fixture.detectChanges();
    component.control.setValue('ho');
    fixture.detectChanges();

    await timer(400).toPromise();

    // Then.
    expect(onSelectSpy).not.toHaveBeenCalled();
  });

  it('should called onSelect method when min length is exceeded', async () => {
    // Given.
    component.debounceTime = 300;
    component.minLength = 3;

    // When.
    fixture.detectChanges();
    component.control.setValue('hooo');
    fixture.detectChanges();

    await timer(400).toPromise();

    // Then.
    expect(onSelectSpy).toHaveBeenCalled();
  });

  // tslint:disable-next-line:no-identical-functions
  it('should called onSelect method when min length is equals to the search term', async () => {
    // Given.
    component.debounceTime = 300;
    component.minLength = 3;

    // When.
    fixture.detectChanges();
    component.control.setValue('hoo');
    fixture.detectChanges();

    await timer(400).toPromise();

    // Then.
    expect(onSelectSpy).toHaveBeenCalled();
  });

  it('should not called onSelect method when min length is exceeded but debounce not exceeded', async () => {
    // Given.
    component.debounceTime = 300;
    component.minLength = 3;

    // When.
    fixture.detectChanges();
    component.control.setValue('hoo');
    fixture.detectChanges();

    // Then.
    expect(onSelectSpy).not.toHaveBeenCalled();
  });

  it('should called onSelect method (consecutively) when min length is exceeded, with 2 searches after debounce', async () => {
    // Given.
    component.debounceTime = 300;
    component.minLength = 3;

    // When.
    fixture.detectChanges();
    component.control.setValue('hoo');
    fixture.detectChanges();

    await timer(400).toPromise();

    // Then.
    expect(onSelectSpy).toHaveBeenCalled();

    component.control.setValue('hoozoo');
    fixture.detectChanges();

    await timer(400).toPromise();

    expect(onSelectSpy).toHaveBeenCalledTimes(2);
  });

  // tslint:disable-next-line:max-line-length
  it('should called onSelect only the first time when min length is exceeded, and a second search is the same as the previous', async () => {
    // Given.
    component.debounceTime = 300;
    component.minLength = 3;

    // When.
    fixture.detectChanges();
    component.control.setValue('hoo');
    fixture.detectChanges();

    await timer(400).toPromise();

    // Then.
    expect(onSelectSpy).toHaveBeenCalled();

    component.control.setValue('');
    fixture.detectChanges();

    component.control.setValue('hoo');
    fixture.detectChanges();

    await timer(400).toPromise();

    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });
});
