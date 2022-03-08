import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Felicitation } from 'src/app/model/Felicitation';
import { FelicitationService } from 'src/app/services/felicitation.service';

@Component({
  selector: 'app-modal-edit-felicitation',
  templateUrl: './modal-edit-felicitation.page.html',
  styleUrls: ['./modal-edit-felicitation.page.scss'],
})
export class ModalEditFelicitationPage implements OnInit {
  @Input() felicitation:Felicitation;

  public form:FormGroup;
  constructor(private fb:FormBuilder,private apiFelicitation:FelicitationService,private modalController:ModalController,public toastController: ToastController) { 
    this.form = this.fb.group({
      multipartFile:[null]
    })
  }

  ngOnInit() {
  }

  public async editFelicitation(){

    var formData: any = new FormData();
    formData.append("f", new Blob([JSON.stringify(this.felicitation)], {
      type: "application/json"
    }));
    formData.append("photo", this.form.get('multipartFile').value);
    this.apiFelicitation.updateFelicitation(formData).then(response => {
      console.log(response);
    })
    console.log("ESTE ES EL CONSOLE"+this.form.get('multipartFile').value);
    this.presentToast();
    this.exit();
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      multipartFile: file
    });
    this.form.get('multipartFile').updateValueAndValidity();

    
  }
  async exit(){
    await this.modalController.dismiss(null , 'cancel');
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'FELICITACION EDITADA CORRECTAMENTE',
      duration: 2000
    });
    toast.present();
  }


}
