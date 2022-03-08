import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditParentPage } from './modal-edit-parent.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditParentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditParentPageRoutingModule {}
