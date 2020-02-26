import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorFacade } from '@app/core/interceptors/error/+store/error.facade';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public showErrorPage$: Observable<any> = this.errorFacade.showErrorPage$;

  constructor(private errorFacade: ErrorFacade) {}
}
