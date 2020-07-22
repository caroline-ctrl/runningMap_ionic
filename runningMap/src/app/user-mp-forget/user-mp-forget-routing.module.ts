import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMpForgetPage } from './user-mp-forget.page';

const routes: Routes = [
  {
    path: '',
    component: UserMpForgetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMpForgetPageRoutingModule {}
