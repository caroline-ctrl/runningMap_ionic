import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrsPageRoutingModule } from './ors-routing.module';

import { OrsPage } from './ors.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OrsPage]
})
export class OrsPageModule {}
