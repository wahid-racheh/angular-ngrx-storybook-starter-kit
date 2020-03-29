import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';
import { unsubscribe } from '@app/core/utils/utils';

@Component({
  selector: 'app-root',
  template: '<app-main></app-main>',
  styleUrls: []
})
export class AppComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private router: Router, private errorFacade: ErrorFacade) {
    // Router subscriber
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((event: any) => {
      if (event instanceof NavigationStart && event.url.indexOf('/**') === -1) {
        this.errorFacade.resetState();
      }
    });
  }

  public ngOnDestroy(): void {
    unsubscribe(this.unsubscribe$);
  }
}
