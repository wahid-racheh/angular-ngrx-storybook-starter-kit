import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from '@app/shared/pipes/safe-html/safe-html.pipe';

const pipes = [SafeHtmlPipe];

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class PipesModule {}
