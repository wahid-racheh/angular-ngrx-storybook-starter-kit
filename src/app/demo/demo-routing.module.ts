import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoResolverService } from '@app/demo/resolvers/demo-resolver.service';
import { DemoContainerComponent } from '@app/demo/containers/demo-container/demo-container.component';

const routes: Routes = [
  {
    path: '',
    component: DemoContainerComponent,
    resolve: { DemoResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule {}
