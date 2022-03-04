import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { FelicitationService } from 'src/app/services/felicitation.service';

@Component({
  selector: 'app-modal-add-felicitation',
  templateUrl: './modal-add-felicitation.page.html',
  styleUrls: ['./modal-add-felicitation.page.scss'],
})
export class ModalAddFelicitationPage implements OnInit {

  public formFelicitation:FormGroup;
  constructor(private fb:FormBuilder,private apiFelicitation:FelicitationService,private modalController:ModalController) { }

  ngOnInit() {
  }

}
