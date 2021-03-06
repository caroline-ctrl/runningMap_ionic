import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'monCompte',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./user-create/user-create.module').then( m => m.UserCreatePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./user-connexion/user-connexion.module').then( m => m.UserConnexionPageModule)
  },
  {
    path: 'update/:id',
    loadChildren: () => import('./user-update/user-update.module').then( m => m.UserUpdatePageModule)
  },
  {
    path: 'mpForget',
    loadChildren: () => import('./user-mp-forget/user-mp-forget.module').then( m => m.UserMpForgetPageModule)
  },
  {
    path: 'user-password',
    loadChildren: () => import('./user-password/user-password.module').then( m => m.UserPasswordPageModule)
  },
  {
    path: 'roundTrip',
    loadChildren: () => import('./ors/ors.module').then( m => m.OrsPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
