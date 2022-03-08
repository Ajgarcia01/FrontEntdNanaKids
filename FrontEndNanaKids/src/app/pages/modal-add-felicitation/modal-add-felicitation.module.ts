import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddFelicitationPageRoutingModule } from './modal-add-felicitation-routing.module';

import { ModalAddFelicitationPage } from './modal-add-felicitation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddFelicitationPageRoutingModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [ModalAddFelicitationPage]
})
export class ModalAddFelicitationPageModule {}
