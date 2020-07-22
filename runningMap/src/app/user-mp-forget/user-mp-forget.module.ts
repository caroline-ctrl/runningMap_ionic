import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserMpForgetPageRoutingModule } from './user-mp-forget-routing.module';

import { UserMpForgetPage } from './user-mp-forget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserMpForgetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserMpForgetPage]
})
export class UserMpForgetPageModule {}
