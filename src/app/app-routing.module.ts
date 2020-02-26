import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';

import { NotFoundComponent } from '@app/shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  {
    path: 'demo',
    loadChildren: () => import('@app/demo/demo.module').then(m => m.DemoModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

const config: ExtraOptions = {
  useHash: false
  // Turn this on to log routing events to the console
  // enableTracing: !environment.production
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
