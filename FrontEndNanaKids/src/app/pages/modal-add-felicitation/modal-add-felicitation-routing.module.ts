import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAddFelicitationPage } from './modal-add-felicitation.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddFelicitationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAddFelicitationPageRoutingModule {}
