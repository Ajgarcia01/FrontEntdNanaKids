import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditFelicitationPage } from './modal-edit-felicitation.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditFelicitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditFelicitationPageRoutingModule {}
