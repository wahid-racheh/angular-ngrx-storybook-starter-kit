import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from '@app/core/services/user/+store/user.effects';
import {
  userInitialState,
  userReducer,
  userStoreName
} from '@app/core/services/user/+store/user.reducer';
import { UserService } from '@app/core/services/user/services/user.service';

@NgModule({
  imports: [
    StoreModule.forFeature(userStoreName, userReducer, { initialState: userInitialState }),
    EffectsModule.forFeature([UserEffects])
  ],
  providers: [UserService, UserEffects]
})
export class UserModule {}
