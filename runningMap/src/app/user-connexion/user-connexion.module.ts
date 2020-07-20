import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserConnexionPageRoutingModule } from './user-connexion-routing.module';

import { UserConnexionPage } from './user-connexion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserConnexionPageRoutingModule
  ],
  declarations: [UserConnexionPage]
})
export class UserConnexionPageModule {}
