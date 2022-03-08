import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddParentPage } from './modal-add-parent.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddParentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddParentPageRoutingModule {}
