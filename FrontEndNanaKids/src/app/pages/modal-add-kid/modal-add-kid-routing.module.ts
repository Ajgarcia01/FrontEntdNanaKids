import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddKidPage } from './modal-add-kid.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddKidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddKidPageRoutingModule {}
