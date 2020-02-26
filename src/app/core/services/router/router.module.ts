import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import {
  NavigationActionTiming,
  routerReducer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { RouterEffects } from '@app/core/services/router/+store/router.effects';
import { CustomSerializer } from '@app/core/services/router/classes/custom-serializer';
import { routerStoreName } from '@app/core/services/router/constants/router.constants';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(routerStoreName, routerReducer),
    EffectsModule.forFeature([RouterEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
      // We rely the action to be dispatched after guards and resolvers successfully
      // By default NavigationActionTiming.PreActivation which means that actions will be dispatched before any guards or resolvers run
      navigationActionTiming: NavigationActionTiming.PostActivation
    })
  ],
  providers: [RouterEffects]
})
export class RouterModule {}
