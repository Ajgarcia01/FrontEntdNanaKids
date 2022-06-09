import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Felicitation } from 'src/app/model/Felicitation';
import { FelicitationService } from 'src/app/services/felicitation.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-modal-edit-felicitation',
  templateUrl: './modal-edit-felicitation.page.html',
  styleUrls: ['./modal-add-kid.page.scss',]['./global.scss'],
})
export class ModalEditFelicitationPage implements OnInit {
  @Input() felicitation:Felicitation;

  public form:FormGroup;
  constructor(private fb:FormBuilder,private apiFelicitation:FelicitationService,
    private modalController:ModalController,
    public toastController: ToastController,private toast:ToastService) { 
    this.form = this.fb.group({
      multipartFile:[null]
    })
  }

  ngOnInit() {
    console.log(this.felicitation);
  }

  public async editFelicitation(){
  
    
    
    var formData: any = new FormData();
    formData.append("f", new Blob([JSON.stringify(this.felicitation)], {
      type: "application/json"
    }));
    formData.append("photo", this.form.get('multipartFile').value);
    await this.apiFelicitation.updateFelicitation(formData)
    this.modalController.dismiss(true)
    this.toast.presentToast("Felicitacion actualizada con exito",2000,"center","success");
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



}
