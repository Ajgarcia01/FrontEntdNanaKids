import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'addkid',
    loadChildren: () => import('./pages/modal-add-kid/modal-add-kid.module').then( m => m.ModalAddKidPageModule)
  },
  {
    path: 'editkid',
    loadChildren: () => import('./pages/modal-edit-kid/modal-edit-kid.module').then( m => m.ModalEditKidPageModule)
  },  {
    path: 'modal-add-parent',
    loadChildren: () => import('./pages/modal-add-parent/modal-add-parent.module').then( m => m.ModalAddParentPageModule)
  },
  {
    path: 'modal-edit-parent',
    loadChildren: () => import('./pages/modal-edit-parent/modal-edit-parent.module').then( m => m.ModalEditParentPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
