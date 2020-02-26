import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DemoEffects } from '@app/demo/+store/demo.effects';

describe('DemoEffects', () => {
  let effects: DemoEffects;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DemoEffects, provideMockActions(() => actions$)]
    });

    effects = TestBed.inject(DemoEffects);
    actions$ = TestBed.inject(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
