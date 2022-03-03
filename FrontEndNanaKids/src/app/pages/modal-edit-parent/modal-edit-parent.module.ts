import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditParentPageRoutingModule } from './modal-edit-parent-routing.module';

import { ModalEditParentPage } from './modal-edit-parent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditParentPageRoutingModule
  ],
  declarations: [ModalEditParentPage]
})
export class ModalEditParentPageModule {}
