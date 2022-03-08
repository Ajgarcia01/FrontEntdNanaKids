import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Felicitation } from '../model/Felicitation';
import { Kid } from '../model/Kid';
import { ModalAddFelicitationPage } from '../pages/modal-add-felicitation/modal-add-felicitation.page';
import { ModalEditFelicitationPage } from '../pages/modal-edit-felicitation/modal-edit-felicitation.page';
import { FelicitationService } from '../services/felicitation.service';
import { ToastService } from '../services/toast.service';

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
  miLoading:HTMLIonLoadingElement

  constructor(private apiFelicitation:FelicitationService,
    public modalController:ModalController,private loading:LoadingController,
    public toast: ToastService,private alert:AlertController) {}

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

  public async getFelicitations(event?){
    if(!event){
      await this.presentLoading();
    }
    this.felicitations = [];
    try{
      this.felicitations = await this.apiFelicitation.getFelicitations();
      
    }catch(err){
      console.error(err);
      //await this.presentToast("Error cargando datos","danger",'bottom');
    } finally{
      if(event){
        event.target.complete();
      }else{
        await this.miLoading.dismiss();
      }
     
    }
  }

  public async deleteFelicitation(felicitation:Felicitation){
    const alert = await this.alert.create({
      header:'Confirmación',
      message:'Estas seguro de que quieres eliminar',
      buttons: [
        {
          text:'Cancelar',
          handler:(blah)=>{
            //nada
          }
        },
        {
          text:'Eliminar',
          handler: async()=>{
            try {
             await this.apiFelicitation.deleteFelicitation(felicitation);
              //Para recargar la lista
              let i = this.felicitations.indexOf(felicitation,0);
              if(i>-1){
                this.felicitations.splice(i,1);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    });
    await alert.present();
    this.toast.presentToast("Felicitacion borrada con exito",2000,"center","danger");
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


  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: ''
    });
    await this.miLoading.present();
  }

  
}
