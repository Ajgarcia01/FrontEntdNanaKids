import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalAddKidPageRoutingModule } from './modal-add-kid-routing.module';

import { ModalAddKidPage } from './modal-add-kid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAddKidPageRoutingModule,
    FormsModule,ReactiveFormsModule
  ],
  declarations: [ModalAddKidPage]
})
export class ModalAddKidPageModule {}
