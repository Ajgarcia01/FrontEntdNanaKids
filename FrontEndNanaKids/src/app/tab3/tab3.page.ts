import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Felicitation } from '../model/Felicitation';
import { Kid } from '../model/Kid';
import { ModalAddFelicitationPage } from '../pages/modal-add-felicitation/modal-add-felicitation.page';
import { ModalEditFelicitationPage } from '../pages/modal-edit-felicitation/modal-edit-felicitation.page';
import { FelicitationService } from '../services/felicitation.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  felicitation:Felicitation
  felicitations:Felicitation[] = []
  
  optionSelected:number
  enviado:string="ENVIADO";
  noEnviado:string="NO ENVIADO";
  cumpleaños:string="CUMPLEAÑOS";
  navidad:string="NAVIDAD";
  nombre:string="";

  constructor(private apiFelicitation:FelicitationService,public modalController:ModalController,public toastController: ToastController) {}

  conversorEstado(felicitationEstado:Felicitation):string{
    if (felicitationEstado.estate){
     return  this.enviado;
    }else{
     return this.noEnviado;
    }
  }
  conversorTipo(felicitationEstado:Felicitation):string{
    if (felicitationEstado.type ==1){
      return  this.cumpleaños;
     }else if (felicitationEstado.type == 2){
      return this.navidad;
     }
  }
/*
  nombreNino(felicitation:Felicitation):string{
    const kid = felicitation.kid;
    const nombre:string = kid.name;
    return nombre;
  }
  */
  async ionViewDidEnter(){
    
    await this.getFelicitations();
    
  }
  public async recoverAlertValue(event:CustomEvent){
    console.log(event.detail.value);
    this.optionSelected = event.detail.value;
    this.felicitations = [];
    if(this.optionSelected != 0){
    this.felicitations = await this.apiFelicitation.getFelicitationsByType(this.optionSelected);
    }else{
      this.felicitations = await this.apiFelicitation.getFelicitations();
    }
  }

  public async getFelicitations(){

    this.felicitations = [];
    this.felicitations = await this.apiFelicitation.getFelicitations();
  }

  public async deleteFelicitation(felicitation:Felicitation){
      await this.apiFelicitation.deleteFelicitation(felicitation);
      this.presentToastDelete();
  }

  async openCreateFelicitation(felicitation:Felicitation){
    const modal = await this.modalController.create({
      component: ModalAddFelicitationPage,
      componentProps: {
        'felicitation': felicitation
      }
    });
    //this.closeSliding();
    return await modal.present();
  }

  async openEditFelicitation(felicitation:Felicitation){
    const modal = await this.modalController.create({
      component: ModalEditFelicitationPage,
      componentProps: {
        'felicitation': felicitation
      }
    });
    //this.closeSliding();
    return await modal.present();
  }

  async presentToastDelete() {
    const toast = await this.toastController.create({
      message: 'FELICITACION ELIMINADA CORRECTAMENTE',
      duration: 2000
    });
    toast.present();
  }
  
}
