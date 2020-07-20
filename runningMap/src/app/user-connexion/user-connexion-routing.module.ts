import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserConnexionPage } from './user-connexion.page';

const routes: Routes = [
  {
    path: '',
    component: UserConnexionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserConnexionPageRoutingModule {}
