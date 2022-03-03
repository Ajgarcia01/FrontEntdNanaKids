import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Felicitation } from '../model/Felicitation';
import { ModalAddFelicitationPage } from '../pages/modal-add-felicitation/modal-add-felicitation.page';
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

  constructor(private apiFelicitation:FelicitationService,public modalController:ModalController) {}

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


  async ionViewDidEnter(){
    
    await this.getFelicitations();
    
  }
  public async recoverAlertValue(event:CustomEvent){
    console.log(event.detail.value);
    this.optionSelected = event.detail.value;
    this.felicitations = [];
    this.felicitations = await this.apiFelicitation.getFelicitationsByType(this.optionSelected);

  }

  public async getFelicitations(){

    this.felicitations = [];
    this.felicitations = await this.apiFelicitation.getFelicitations();
  }

  public async deleteFelicitation(felicitation:Felicitation){
   
    this.apiFelicitation.deleteFelicitation(felicitation);

  }
  
  async openCreateFelicitation(felicitation:Felicitation){
    const modal = await this.modalController.create({
      component: ModalAddFelicitationPage,//CREAR NUEVA PAGE PARA AÑADIR FELICITACION
      componentProps: {
        'felicitation': felicitation
      }
    });
    //this.closeSliding();
    return await modal.present();
  }
  
}
