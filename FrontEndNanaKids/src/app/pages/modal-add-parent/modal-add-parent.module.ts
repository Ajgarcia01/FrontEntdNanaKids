import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddParentPageRoutingModule } from './modal-add-parent-routing.module';

import { ModalAddParentPage } from './modal-add-parent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddParentPageRoutingModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [ModalAddParentPage]
})
export class ModalAddParentPageModule {}
