import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FooterComponent } from '@app/layout/components/footer/footer.component';
import { HeaderComponent } from '@app/layout/components/header/header.component';
import { MainComponent } from '@app/layout/pages/main/main.component';
import { SharedModule } from '@app/shared/shared.module';

const components = [HeaderComponent, FooterComponent, MainComponent];

@NgModule({
  imports: [RouterModule, SharedModule],
  declarations: [...components],
  exports: [...components]
})
export class LayoutModule {}
