import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditKidPageRoutingModule } from './modal-edit-kid-routing.module';

import { ModalEditKidPage } from './modal-edit-kid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditKidPageRoutingModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [ModalEditKidPage]
})
export class ModalEditKidPageModule {}
