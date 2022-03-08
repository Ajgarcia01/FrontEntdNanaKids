import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditParentPageRoutingModule } from './modal-edit-parent-routing.module';

import { ModalEditParentPage } from './modal-edit-parent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditParentPageRoutingModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [ModalEditParentPage]
})
export class ModalEditParentPageModule {}
