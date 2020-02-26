import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  public code$: Observable<any> = this.errorFacade.code$;
  public message$: Observable<any> = this.errorFacade.message$;
  public error$: Observable<any> = this.errorFacade.error$;

  constructor(private errorFacade: ErrorFacade) {}
}
