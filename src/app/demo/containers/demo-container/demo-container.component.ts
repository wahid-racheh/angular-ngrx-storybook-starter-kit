import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DemoFacade } from '@app/demo/+store/demo.facade';

@Component({
  selector: 'app-demo-container',
  templateUrl: './demo-container.component.html',
  styleUrls: ['./demo-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoContainerComponent {
  public pageTitle$: Observable<string> = this.demoFacade.pageTitle$;

  constructor(private demoFacade: DemoFacade) {}
}
