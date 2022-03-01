import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addkid',
    loadChildren: () => import('./pages/modal-add-kid/modal-add-kid.module').then( m => m.ModalAddKidPageModule)
  },
  {
    path: 'editkid',
    loadChildren: () => import('./pages/modal-edit-kid/modal-edit-kid.module').then( m => m.ModalEditKidPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
