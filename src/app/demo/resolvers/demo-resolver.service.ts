import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DemoFacade } from '@app/demo/+store/demo.facade';

@Injectable()
export class DemoResolverService {
  constructor(private demoFacade: DemoFacade) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.demoFacade.setPageTitle('My Demo App');
  }
}
