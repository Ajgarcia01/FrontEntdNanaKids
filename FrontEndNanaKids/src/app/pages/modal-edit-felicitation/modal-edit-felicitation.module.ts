import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditFelicitationPageRoutingModule } from './modal-edit-felicitation-routing.module';

import { ModalEditFelicitationPage } from './modal-edit-felicitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEditFelicitationPageRoutingModule,
    FormsModule,ReactiveFormsModule

  ],
  declarations: [ModalEditFelicitationPage]
})
export class ModalEditFelicitationPageModule {}
